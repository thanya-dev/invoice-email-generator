import { getDefaultDeadlineDate } from './deadline.js';

export const generateEmailHTML = (data) => {
  const { paymentName, items = [] } = data;
  
  const currentItems = items.length > 0 ? items : [data];

  const rowsHTML = currentItems.map((item, index) => {
      const { campaignName, invoiceUrl, invoiceNo, paidDateTime, netAmount } = item;
      const cleanInvoiceNo = (invoiceNo || '').trim();
      const isValidInvoiceNo = cleanInvoiceNo !== '' && cleanInvoiceNo !== '-';
      const cleanUrl = (invoiceUrl || '').trim();
      const isValidUrl = cleanUrl !== '' && cleanUrl !== '-';
      
      let invoiceHTML = '';
      if (isValidUrl) {
          const url = cleanUrl.startsWith('http') ? cleanUrl : 'http://' + cleanUrl;
          if (isValidInvoiceNo) {
              invoiceHTML = `<a target="_blank" href="${url}">${invoiceNo}</a>`;
          } else {
              invoiceHTML = `<a target="_blank" href="${url}">Link</a>`;
          }
      } else {
          if (isValidInvoiceNo) {
              invoiceHTML = invoiceNo;
          } else {
              invoiceHTML = '-';
          }
      }
      return `<tr>
                                    <td style="padding: 9px 12px; border: 1px solid rgb(208, 215, 222); text-align: center">
                                        ${index + 1}
                                        <br>
                                    </td>
                                    <td style="padding: 9px 12px; border: 1px solid rgb(208, 215, 222)">
                                        ${campaignName || ''}&nbsp;
                                        <br>
                                    </td>
                                    <td style="padding: 9px 12px; border: 1px solid rgb(208, 215, 222); text-align: center">
                                        ${invoiceHTML}
                                        <br>
                                    </td>
                                    <td style="padding: 9px 12px; border: 1px solid rgb(208, 215, 222); text-align: center">
                                        &nbsp;${paidDateTime || ''}
                                        <br>
                                    </td>
                                    <td style="padding: 9px 12px; border: 1px solid rgb(208, 215, 222); text-align: right">
                                        ${netAmount || ''} บาท
                                        <br>
                                    </td>
                                </tr>`;
  }).join('');

  return `<div>
    <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt">
        <div>
            <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt">
                <div>
                    <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt">
                        <div style="text-align: left">
                            <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; text-align: left">
                                <div>
                                    <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt">
                                        <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt">
                                            <div style="font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13.333px; line-height: 1.7; color: rgb(17, 24, 39); max-width: 720px; margin: 0; padding: 0">
                                                <p style="margin: 0 0 16px 0">
                                                    <b>
                                                        เรียน ${paymentName || ''}&nbsp;&nbsp;
                                                    </b>
                                                    <br>
                                                </p>
                                                <p style="margin: 0 0 16px 0">
                                                    บริษัท บับเบิลลี จำกัด (Buddy Review) ขอความกรุณาท่านจัดส่ง
                                                    <b>
                                                        ใบเสร็จรับเงิน / ใบกำกับภาษี
                                                    </b>
                                                    สำหรับรายการที่บริษัทได้ดำเนินการชำระเงินเรียบร้อยแล้ว ตามรายละเอียดด้านล่าง
                                                    <br>
                                                </p>
                                                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13.333px; margin: 12px 0px 10px; border: 1px solid rgb(208, 215, 222); height: 138.938px">
                                                    <thead>
                                                        <tr>
                                                            <th style="background-color: rgb(11, 45, 99); color: rgb(255, 255, 255); padding: 10px 12px; border: 1px solid rgb(11, 45, 99); text-align: center; font-weight: bold" class="x_632680869x_2076632585x_2118404798align-center">
                                                                No.
                                                                <br>
                                                            </th>
                                                            <th style="background-color: rgb(11, 45, 99); color: rgb(255, 255, 255); padding: 10px 12px; border: 1px solid rgb(11, 45, 99); text-align: center; font-weight: bold" class="x_632680869x_2076632585x_2118404798align-center">
                                                                แคมเปญ
                                                                <br>
                                                            </th>
                                                            <th style="background-color: rgb(11, 45, 99); color: rgb(255, 255, 255); padding: 10px 12px; border: 1px solid rgb(11, 45, 99); text-align: center; font-weight: bold" class="x_632680869x_2076632585x_2118404798align-center">
                                                                Invoice
                                                                <br>
                                                            </th>
                                                            <th style="background-color: rgb(11, 45, 99); color: rgb(255, 255, 255); padding: 10px 12px; border: 1px solid rgb(11, 45, 99); text-align: center; font-weight: bold" class="x_632680869x_2076632585x_2118404798align-center">
                                                                วันจ่ายชำระ
                                                                <br>
                                                            </th>
                                                            <th style="background-color: rgb(11, 45, 99); color: rgb(255, 255, 255); padding: 10px 12px; border: 1px solid rgb(11, 45, 99); text-align: center; font-weight: bold" class="x_632680869x_2076632585x_2118404798align-center">
                                                                <div>
                                                                    มูลค่าตามเอกสาร
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    (รวม VAT)
                                                                    <br>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                ${rowsHTML}
                            </tbody>
                                                </table>
                                                <p style="margin: 0px 0px 18px">
                                                    <span class="colour" style="color: rgb(55, 65, 81); margin: 0px 0px 18px;">
                                                        *รายละเอียด Invoice เพิ่มเติมอยู่ในไฟล์แนบค่ะ
                                                    </span>
                                                    <br>
                                                </p>
                                                <div style="background-color: rgb(239, 246, 255); border-left: 4px solid rgb(11, 45, 99); padding: 14px 16px; margin: 0 0 16px 0">
                                                    <div style="font-weight: bold; color: rgb(11, 45, 99); margin-bottom: 8px">
                                                        รบกวนดำเนินการภายในวันที่
                                                        <span class="colour" style="color:rgb(255, 51, 51)">
                                                            ${data.deadlineDate || getDefaultDeadlineDate()}
                                                        </span>
                                                        <span class="colour" style="color:rgb(255, 102, 102)">
                                                        </span>
                                                        ดังนี้
                                                        <br>
                                                    </div>
                                                    <ol style="margin: 0; padding-left: 20px">
                                                        <li style="margin-bottom: 6px">
                                                            ส่ง
                                                            <b>
                                                                ไฟล์ใบเสร็จรับเงิน / ใบกำกับภาษี (PDF)
                                                            </b>
                                                            กลับมาทางอีเมลนี้
                                                            <br>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                จัดส่ง
                                                                <b>
                                                                    เอกสารตัวจริงที่มีลายมือชื่อผู้รับเงิน
                                                                </b>
                                                                มายังที่อยู่บริษัทด้านล่าง
                                                                <br>
                                                            </div>
                                                            <div>
                                                                <br>
                                                            </div>
                                                            <div style="background-color: rgb(249, 250, 251); border: 1px solid rgb(208, 215, 222); padding: 14px 16px; margin: 0 0 16px 0">
                                                                <div style="font-weight: bold; margin-bottom: 6px; color: rgb(17, 24, 39)">
                                                                    ที่อยู่สำหรับจัดส่งเอกสารตัวจริง
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    บริษัท บับเบิลลี จำกัด (สำนักงานใหญ่)
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    อาคารชินวัตรทาวเวอร์ 3 ห้อง 603 ชั้น 6
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    เลขที่ 1010 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900
                                                                    <br>
                                                                </div>
                                                                <div>
                                                                    เลขประจำตัวผู้เสียภาษี:
                                                                    <b>
                                                                        0105562115475
                                                                    </b>
                                                                    <br>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <p style="margin: 0 0 12px 0">
                                                    บริษัทจำเป็นต้องได้รับทั้ง
                                                    <b>
                                                        Soft File และเอกสารตัวจริง
                                                    </b>
                                                    เพื่อใช้ประกอบการบันทึกบัญชีและดำเนินการด้านภาษีให้เป็นไปตามที่กฎหมายกำหนด
                                                    <br>
                                                </p>
                                                <p style="margin: 0 0 16px 0">
                                                    <b>
                                                        หากท่านได้จัดส่งเอกสารเรียบร้อยแล้ว
                                                    </b>
                                                    รบกวนตอบกลับอีเมลนี้พร้อมแนบไฟล์ PDF และแจ้งเลขพัสดุ เพื่อให้ฝ่ายบัญชีสามารถตรวจสอบและยืนยันการรับเอกสารได้รวดเร็วยิ่งขึ้น
                                                    <br>
                                                </p>
                                                <p style="margin: 0 0 16px 0">
                                                    <b>หากท่านได้นำส่งเอกสาร ใบเสร็จรับเงิน / ใบกำกับภาษี เรียบร้อยแล้วก่อนได้รับอีเมลฉบับนี้</b> บริษัทฯ ต้องขอภัยในความไม่สะดวกมา ณ ที่นี้
                                                    <br>
                                                </p>
                                                <div style="background-color: rgb(255, 247, 237); border: 1px solid rgb(254, 215, 170); padding: 14px 16px; margin: 0 0 18px 0">
                                                    <div style="font-weight: bold; color: rgb(194, 65, 12); margin-bottom: 8px">
                                                        หมายเหตุ
                                                        <br>
                                                    </div>
                                                    <ul style="margin: 0; padding-left: 18px">
                                                        <li style="margin-bottom: 6px">
                                                            เพื่อให้การดำเนินงานด้านบัญชีและภาษีเป็นไปอย่างถูกต้องและครบถ้วนตามกฎหมาย บริษัทขอความร่วมมือในการจัดส่งเอกสารภายในกำหนด
                                                            <br>
                                                        </li>
                                                        <li style="margin-bottom: 6px">
                                                            <b>
                                                                หากไม่จัดส่งใบกำกับภาษีที่ถูกต้องครบถ้วนภายในระยะเวลาที่กำหนด และทำให้บริษัทเสียสิทธิ์ในการนำ VAT ไปใช้เป็นภาษีซื้อ บริษัทขอสงวนสิทธิ์หักเงินในรอบการจ่ายถัดไป เป็นจำนวนเท่ากับมูลค่า VAT ที่บริษัทเสียสิทธิ์ดังกล่าว&nbsp;
                                                            </b>
                                                            <br>
                                                        </li>
                                                        <li style="margin-bottom: 6px">
                                                            การออกและส่งมอบใบเสร็จรับเงิน / ใบกำกับภาษี เป็นหน้าที่ของผู้มีหน้าที่ออกเอกสารตามประมวลรัษฎากร หากไม่ดำเนินการหรือออกเอกสารไม่ถูกต้อง อาจมีความรับผิดตามกฎหมาย
                                                            <br>
                                                        </li>
                                                        <li>
                                                            ศึกษารายละเอียดเพิ่มเติมเกี่ยวกับการออกใบกำกับภาษีได้ที่กรมสรรพากร
                                                            <a href="https://www.rd.go.th/fileadmin/user_upload/ebook/taxinvoice.pdf" target="_blank" style="color: rgb(26, 98, 255); text-decoration: underline">
                                                                https://www.rd.go.th/fileadmin/user_upload/ebook/taxinvoice.pdf
                                                            </a>
                                                            <span>
                                                                <br>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <br>
                                                </div>
                                                <div>
                                                    ขอขอบคุณสำหรับความร่วมมือค่ะ
                                                    <br>
                                                </div>
                                                <div>
                                                    <div>
                                                        Best regards,
                                                        <br>
                                                    </div>
                                                    <div>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="x_632680869x_2076632585x_2118404798zmail_signature_below">
                                                <div>
                                                    <div style="background-color: rgb(245, 245, 245)">
                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align: top" valign="top" align="left">
                                                                        <table width="100%" style="margin: 0" id="x_2118404798brick_container" class="x_632680869x_2076632585x_2118404798email-container" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" align="left">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" style="vertical-align: top" width="100%">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td valign="top" style="vertical-align: top" width="100%">
                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                            <img height="10" width="600" style="width: 100%; height: 10px; display: block" src="https://plugin.markaimg.com/public/77a8135b/QpiGA77SkiVRDBPzaRnVTHiuNl4puL.jpeg" border="0">
                                                                                                        </span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td valign="top" width="100%" style="vertical-align: top; padding-left: 15px; padding-right: 15px" align="right">
                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td valign="top" style="vertical-align: top; height: 10px; min-height: 10px; line-height: 10px" height="10">
                                                                                                                        <br>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td valign="top" style="vertical-align: top" width="87" align="right">
                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                            <img width="87" style="min-width: 87px; width: 87px; height: auto; display: block" src="https://plugin.markaimg.com/public/77a8135b/i5RZjYPtkozA6O6zzIBaIbxaySlECy.png" border="0">
                                                                                                                        </span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td valign="top" style="vertical-align: top; height: 15px; min-height: 15px; line-height: 15px" height="15">
                                                                                                                        <br>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td valign="top" height="381" width="100%" style="vertical-align: top; height: 381px">
                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td valign="top" width="100%" style="vertical-align: top; height: auto; padding-left: 24px; padding-right: 24px">
                                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; width: 2061px">
                                                                                                                                        <div style="line-height: normal; text-align: left">
                                                                                                                                            <span class="colour" style="color:rgb(95, 38, 229)">
                                                                                                                                                <b>
                                                                                                                                                    <span class="size" style="font-size:12px">
                                                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                                                            Accounting Team
                                                                                                                                                            <br>
                                                                                                                                                        </span>
                                                                                                                                                    </span>
                                                                                                                                                </b>
                                                                                                                                                <span class="size" style="font-size:12px">
                                                                                                                                                    <span class="font" style="font-family:verdana">
                                                                                                                                                    </span>
                                                                                                                                                </span>
                                                                                                                                            </span>
                                                                                                                                            <span class="size" style="font-size:12px">
                                                                                                                                                <span class="font" style="font-family:verdana">
                                                                                                                                                </span>
                                                                                                                                            </span>
                                                                                                                                            <span class="colour" style="color:rgb(90, 89, 89)">
                                                                                                                                                <span class="size" style="font-size:12px">
                                                                                                                                                    <span class="font" style="font-family:verdana">
                                                                                                                                                        บริษัท บับเบิลลี จำกัด
                                                                                                                                                    </span>
                                                                                                                                                </span>
                                                                                                                                            </span>
                                                                                                                                        </div>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; height: 19px; min-height: 15px; line-height: 15px; width: 2061px" height="15">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; width: 2061px">
                                                                                                                                        <div style="line-height: normal; text-align: left">
                                                                                                                                            <span class="colour" style="color:rgb(95, 38, 229)">
                                                                                                                                                <a style="color: rgb(18, 100, 163); text-decoration: none" href="mailto:accounting@buddyreview.co" target="_blank">
                                                                                                                                                    <span class="size" style="font-size:12px">
                                                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                                                            accounting@buddyreview.co
                                                                                                                                                        </span>
                                                                                                                                                    </span>
                                                                                                                                                </a>
                                                                                                                                                <span class="size" style="font-size:12px">
                                                                                                                                                    <span class="font" style="font-family:verdana">
                                                                                                                                                        <br>
                                                                                                                                                            088 686 1676
                                                                                                                                                        <br>
                                                                                                                                                    </span>
                                                                                                                                                </span>
                                                                                                                                            </span>
                                                                                                                                            <span class="size" style="font-size:12px">
                                                                                                                                                <span class="font" style="font-family:verdana">
                                                                                                                                                </span>
                                                                                                                                            </span>
                                                                                                                                            <a target="_blank" style="color: rgb(95, 38, 229); font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: normal; text-align: left; text-decoration: underline" href="https://business.buddyreview.co/th">
                                                                                                                                                <span class="size" style="font-size:12px">
                                                                                                                                                    <span class="font" style="font-family:verdana">
                                                                                                                                                    </span>
                                                                                                                                                </span>
                                                                                                                                                <span>
                                                                                                                                                    <span class="size" style="font-size:12px">
                                                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                                                            business.buddyreview.co
                                                                                                                                                        </span>
                                                                                                                                                    </span>
                                                                                                                                                </span>
                                                                                                                                            </a>
                                                                                                                                        </div>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; height: 10px; min-height: 10px; line-height: 10px; width: 2061px" height="10">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td valign="middle" height="90" width="100%" style="vertical-align: middle; height: 90px; border-width: 1px 0 1px 0; border-color: rgb(192, 192, 192); border-style: dashed; padding-left: 25px; padding-right: 25px">
                                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; height: 10px; min-height: 10px; line-height: 10px" height="10">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="middle" width="100%" style="vertical-align: middle">
                                                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                                                            <tbody>
                                                                                                                                                <tr>
                                                                                                                                                    <td valign="middle" width="100%" style="vertical-align: middle; height: auto">
                                                                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                                                            <tbody>
                                                                                                                                                                <tr>
                                                                                                                                                                    <td valign="top" style="vertical-align: top">
                                                                                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                                                                                            <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                    <td valign="middle" width="100%" style="vertical-align: middle">
                                                                                                                                                                                        <span class="colour" style="color:rgb(90, 89, 89)">
                                                                                                                                                                                            <b>
                                                                                                                                                                                                <span class="size" style="font-size: 12px; line-height: normal; text-align: right;">
                                                                                                                                                                                                    <span class="font" style="font-family:verdana">
                                                                                                                                                                                                        Bubblely Co., Ltd.
                                                                                                                                                                                                    </span>
                                                                                                                                                                                                </span>
                                                                                                                                                                                            </b>
                                                                                                                                                                                        </span>
                                                                                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                                                                                        </span>
                                                                                                                                                                                        <br>
                                                                                                                                                                                    </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                                <tr>
                                                                                                                                                                                    <td valign="middle" width="100%" style="vertical-align: middle">
                                                                                                                                                                                        <span class="colour" style="color:rgb(90, 89, 89)">
                                                                                                                                                                                            <span class="size" style="font-size: 11px; line-height: normal; text-align: right;">
                                                                                                                                                                                                <span class="font" style="font-family:verdana">
                                                                                                                                                                                                    1010 Shinawatra Tower 3, Room 603, 6th Floor, Vibhavadi Rungsit Road, Chatuchak, Bangkok 10900
                                                                                                                                                                                                </span>
                                                                                                                                                                                            </span>
                                                                                                                                                                                        </span>
                                                                                                                                                                                        <span class="font" style="font-family:verdana">
                                                                                                                                                                                        </span>
                                                                                                                                                                                        <br>
                                                                                                                                                                                    </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                            </tbody>
                                                                                                                                                                        </table>
                                                                                                                                                                    </td>
                                                                                                                                                                </tr>
                                                                                                                                                            </tbody>
                                                                                                                                                        </table>
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                            </tbody>
                                                                                                                                        </table>
                                                                                                                                    </td>
                                                                                                                                    <td valign="top" style="vertical-align: top">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; height: 20px; min-height: 20px; line-height: 20px" height="20">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" height="50" width="333" style="vertical-align: top; height: 50px">
                                                                                                                                        <div style="line-height: normal; text-align: left">
                                                                                                                                            <span class="font" style="font-family:verdana">
                                                                                                                                                <img width="191" style="min-width: 191px; width: 191px; height: auto; display: block" src="https://plugin.markaimg.com/public/77a8135b/gJ3OimmCGguHsWWY1Ng3yHM0qYRlNW.png" border="0">
                                                                                                                                            </span>
                                                                                                                                        </div>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" style="vertical-align: top; height: 10px; min-height: 10px; line-height: 10px" height="10">
                                                                                                                                        <br>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td valign="top" style="vertical-align: top; height: 10px; min-height: 10px; line-height: 10px" height="10">
                                                                                                                        <br>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td valign="top" style="vertical-align: top" width="100%">
                                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td valign="top" width="100%" style="vertical-align: top; height: auto; background-color: rgb(45, 19, 125); padding-left: 24px; padding-right: 24px; padding-top: 9px; padding-bottom: 9px">
                                                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                                                            <tbody>
                                                                                                                                                <tr>
                                                                                                                                                    <td valign="middle" style="vertical-align: middle">
                                                                                                                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                                                                                                                            <tbody>
                                                                                                                                                                <tr>
                                                                                                                                                                    <td valign="top" style="vertical-align: top" width="22">
                                                                                                                                                                        <a target="_blank" href="https://www.facebook.com/buddyreviewthailand/">
                                                                                                                                                                            <img width="22" style="width: 22px; max-width: 22px; display: block" src="https://plugin.markaimg.com/public/77a8135b/V2G986N9v6uWzI9u42t32B2T2kK0vD.png" border="0">
                                                                                                                                                                        </a>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top; width: 15px; min-width: 15px" width="15">
                                                                                                                                                                        <br>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top" width="22">
                                                                                                                                                                        <a target="_blank" href="https://www.tiktok.com/@buddy_review">
                                                                                                                                                                            <img width="22" style="width: 22px; max-width: 22px; display: block" src="https://plugin.markaimg.com/public/77a8135b/23i98Hn6y4Q2mO8W42Pq20oG20A3wH.png" border="0">
                                                                                                                                                                        </a>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top; width: 15px; min-width: 15px" width="15">
                                                                                                                                                                        <br>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top" width="22">
                                                                                                                                                                        <a target="_blank" href="https://page.line.me/buddyreview">
                                                                                                                                                                            <img width="22" style="width: 22px; max-width: 22px; display: block" src="https://plugin.markaimg.com/public/77a8135b/c2Z98a72N5l5lE5h42C92z1u2uL1X4.png" border="0">
                                                                                                                                                                        </a>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top; width: 15px; min-width: 15px" width="15">
                                                                                                                                                                        <br>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top" width="22">
                                                                                                                                                                        <a target="_blank" href="https://www.linkedin.com/company/buddyreview/">
                                                                                                                                                                            <img width="22" style="width: 22px; max-width: 22px; display: block" src="https://plugin.markaimg.com/public/77a8135b/52j98X76f9l4cT3i42A72GZ624U4c4.png" border="0">
                                                                                                                                                                        </a>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top; width: 15px; min-width: 15px" width="15">
                                                                                                                                                                        <br>
                                                                                                                                                                    </td>
                                                                                                                                                                    <td valign="top" style="vertical-align: top" width="22">
                                                                                                                                                                        <a target="_blank" href="https://www.instagram.com/buddy.review/">
                                                                                                                                                                            <img width="22" style="width: 22px; max-width: 22px; display: block" src="https://plugin.markaimg.com/public/77a8135b/X2m984s7u3X5rM9m42m92K4023P2H8.png" border="0">
                                                                                                                                                                        </a>
                                                                                                                                                                    </td>
                                                                                                                                                                </tr>
                                                                                                                                                            </tbody>
                                                                                                                                                        </table>
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                            </tbody>
                                                                                                                                        </table>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <br>
                        </div>
                    </div>
                </div>
                <div>
                    <br>
                </div>
            </div>
        </div>
        <div>
            <br>
        </div>
    </div>
    <br>
</div>`;
};
