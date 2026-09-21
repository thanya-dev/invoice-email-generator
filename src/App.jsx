import { useState, useRef } from 'react';
import { generateEmailHTML } from './utils/template';
import { getDefaultDeadlineDate } from './utils/deadline';
import './App.css';

function App() {
  const [toast, setToast] = useState(null);
  const [dataList, setDataList] = useState([]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pasteData, setPasteData] = useState('');
  
  // Single form data (fallback or manual edit)
  const [formData, setFormData] = useState({
    paymentName: '',
    email: '',
    deadlineDate: getDefaultDeadlineDate(),
    items: [
      {
        campaignName: '',
        invoiceUrl: '',
        invoiceNo: '',
        paidDateTime: '',
        netAmount: ''
      }
    ]
  });

  const handlePasteData = (e) => {
    const text = e.target.value;
    setPasteData(text);
    
    // Parse TSV
    const rows = text.split('\n').filter(row => row.trim() !== '');
    if (rows.length === 0) return;
    
    const headers = rows[0].split('\t').map(h => h.trim());
    const groupedData = {};
    
    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split('\t').map(c => c.trim());
      const rowData = {};
      headers.forEach((header, index) => {
        // map loosely based on expected names
        const lowerHeader = header.toLowerCase();
        if (lowerHeader.includes('payment') && !lowerHeader.includes('date')) {
          rowData.paymentName = cols[index];
        } else if (lowerHeader.includes('campaign')) {
          rowData.campaignName = cols[index];
        } else if (lowerHeader.includes('url')) {
          rowData.invoiceUrl = cols[index];
        } else if (lowerHeader.includes('no') || lowerHeader.includes('invoice')) {
          rowData.invoiceNo = cols[index];
        } else if (lowerHeader.includes('paid') || lowerHeader.includes('payment date') || lowerHeader === 'paiddatetime') {
          rowData.paidDateTime = cols[index];
        } else if (lowerHeader.includes('amount') || lowerHeader.includes('net')) {
          rowData.netAmount = cols[index];
        } else if (lowerHeader.includes('email')) {
          rowData.email = cols[index];
        } else if (lowerHeader.includes('name') && !rowData.paymentName) {
          rowData.paymentName = cols[index]; // fallback if header is just 'name'
        }
        
        // exact match fallback
        if (!rowData[header]) {
           rowData[header] = cols[index];
        }
      });
      
      const pName = rowData.paymentName || rowData.PaymentName || '';
      if (!groupedData[pName]) {
        groupedData[pName] = {
          paymentName: pName,
          email: rowData.email || rowData.Email || '',
          deadlineDate: rowData.deadlineDate || rowData.DeadlineDate || getDefaultDeadlineDate(),
          items: []
        };
      }
      
      groupedData[pName].items.push({
        campaignName: rowData.campaignName || rowData.CampaignName || '',
        invoiceUrl: rowData.invoiceUrl || rowData.InvoiceUrl || '',
        invoiceNo: rowData.invoiceNo || rowData.InvoiceNo || '',
        paidDateTime: rowData.paidDateTime || rowData.PaidDateTime || '',
        netAmount: rowData.netAmount || rowData.NetAmount || '',
      });
    }
    
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0);
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
      return new Date(dateStr); // fallback
    };

    const finalData = Object.values(groupedData).filter(g => g.paymentName !== '').map(g => {
      g.items.sort((a, b) => parseDate(a.paidDateTime) - parseDate(b.paidDateTime));
      return g;
    });

    if (finalData.length > 0) {
      setDataList(finalData);
      setCurrentIndex(0);
      setFormData(finalData[0]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...(formData.items || [])];
    newItems[index] = { ...newItems[index], [name]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const loadRecord = (index) => {
    setCurrentIndex(index);
    setFormData(dataList[index]);
  };

  const htmlContent = generateEmailHTML(formData);

  const copyTitle = () => {
    const title = `[บริษัท บับเบิลลี จำกัด] กรุณาจัดส่งใบเสร็จรับเงิน / ใบกำกับภาษี ภายใน ${formData.deadlineDate} (${formData.paymentName})`;
    navigator.clipboard.writeText(title)
      .then(() => showToast(`Copied Title`))
      .catch(err => console.error('Failed to copy', err));
  };

  const copyEmailAddress = () => {
    if (formData.email) {
      navigator.clipboard.writeText(formData.email)
        .then(() => showToast(`Copied email: ${formData.email}`))
        .catch(err => console.error('Failed to copy', err));
    } else {
      showToast('No email address found for this record.');
    }
  };

  const copyForEmailClient = async () => {
    try {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([htmlContent], { type: 'text/plain' });
      const data = [new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      })];
      await navigator.clipboard.write(data);
      showToast('Copied content to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast('Failed to copy. Try copying the HTML instead.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>BuddyReview Email Generator</h1>
        <p>Generate invoice request emails efficiently.</p>
      </header>

      <main className="app-content">
        <section className="input-section">
          <div className="card">
            <h2>1. Paste Excel Data</h2>
            <p className="hint">Make sure headers are: paymentName, campaignName, invoiceNo, email, invoiceUrl, paidDateTime, netAmount.</p>
            <textarea 
              className="paste-area" 
              placeholder="Paste columns from Excel/Sheets here..." 
              value={pasteData}
              onChange={handlePasteData}
            />
            
            {dataList.length > 0 && (
              <div className="record-navigation">
                <p>Found {dataList.length} records.</p>
                <div className="pagination">
                  <button disabled={currentIndex === 0} onClick={() => loadRecord(currentIndex - 1)}>Prev</button>
                  <span>Record {currentIndex + 1} of {dataList.length}</span>
                  <button disabled={currentIndex === dataList.length - 1} onClick={() => loadRecord(currentIndex + 1)}>Next</button>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h2>2. Edit Variables</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Payment Name</label>
                <input type="text" name="paymentName" value={formData.paymentName} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="text" name="email" value={formData.email} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Deadline (DD/MM/YYYY)</label>
                <input type="text" name="deadlineDate" value={formData.deadlineDate} onChange={handleFormChange} />
              </div>
              
              <div style={{ gridColumn: '1 / -1', marginTop: '10px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '14px', margin: 0, color: '#4b5563' }}>Invoices ({formData.items ? formData.items.length : 0})</h3>
              </div>
              {formData.items && formData.items.map((item, idx) => (
                <div key={idx} style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Campaign Name</label>
                    <input type="text" name="campaignName" value={item.campaignName} onChange={(e) => handleItemChange(idx, e)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Invoice URL</label>
                    <input type="text" name="invoiceUrl" value={item.invoiceUrl} onChange={(e) => handleItemChange(idx, e)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Invoice No.</label>
                    <input type="text" name="invoiceNo" value={item.invoiceNo} onChange={(e) => handleItemChange(idx, e)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Paid Date</label>
                    <input type="text" name="paidDateTime" value={item.paidDateTime} onChange={(e) => handleItemChange(idx, e)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Net Amount (บาท)</label>
                    <input type="text" name="netAmount" value={item.netAmount} onChange={(e) => handleItemChange(idx, e)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="preview-section">
          <div className="card preview-card">
            <div className="preview-header">
              <h2>3. Email Preview</h2>
              <div className="action-buttons">
                <button className="btn-secondary" onClick={copyEmailAddress}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Copy Email
                </button>
                <button className="btn-secondary" onClick={copyTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                  Copy Title
                </button>
                <button className="btn-primary" onClick={copyForEmailClient}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Copy Content
                </button>
              </div>
            </div>
            <div className="email-preview-container">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </section>
      </main>
      
      {toast && (
        <div className="toast-container">
          <div className="toast">{toast}</div>
        </div>
      )}
    </div>
  );
}

export default App;
