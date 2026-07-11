// ===== EXPORT FUNCTIONS =====
function mftExportCSV(type){exportAllCSV(type)}

function mftExportJSON(){
  const data={version:2,exportedAt:(new Date()).toISOString(),business:DB.bus(),customers:DB.custs(),invoices:DB.invs(),quotes:DB.quos(),orders:DB.ords(),creditNotes:DB.cns(),items:DB.items(),payments:DB.pays(),templates:DB.tpls(),groups:DB.d.groups||[],settings:{language:_lang||'en',currency:_currency||'USD',dateFormat:_dateFmt||'yyyy-MM-dd',region:_region||'none',theme:_theme||'wood'}};
  const json=JSON.stringify(data,null,2);
  downloadFile(json,'premier_backup_'+today()+'.json','application/json');
  toast('JSON backup downloaded','success');
}

function mftExportDAT(){
  const data={version:2,exportedAt:(new Date()).toISOString(),business:DB.bus(),customers:DB.custs(),invoices:DB.invs(),quotes:DB.quos(),orders:DB.ords(),creditNotes:DB.cns(),items:DB.items(),payments:DB.pays(),templates:DB.tpls(),groups:DB.d.groups||[]};
  const json=JSON.stringify(data);
  const encoded=btoa(unescape(encodeURIComponent(json)));
  const dat=':: PREMIER_INVOICING_DATA v2\n:: Source: Premier Invoicing\n:: Exported: '+new Date().toISOString()+'\n:: Records: '+DB.invs().length+' invoices, '+DB.custs().length+' customers\n:: ==============================================\n:: PI_DATA: '+encoded+'\n:: ==============================================\n@echo off\necho Premier Invoicing Data File\necho This file contains encoded backup data.\npause';
  downloadFile(dat,'premier_backup_'+today()+'.dat','text/plain');
  toast('DAT backup downloaded','success');
}

function downloadFile(content,filename,mimeType){
  const blob=new Blob([content],{type:mimeType||'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url)},100);
}

// ===== BACKUP FUNCTIONS =====
function mftBackupJSON(){mftExportJSON()}
function mftBackupDAT(){mftExportDAT()}

// Keyboard shortcuts
const SHORTCUTS={'?':()=>helpDlg(),'h':()=>navTo("dashboard"),'i':()=>navTo("invoices"),'q':()=>navTo("quotes"),'c':()=>navTo("customers")};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mc)closeM();if(SHORTCUTS[e.key]&&!e.ctrlKey&&!e.metaKey&&!e.altKey){SHORTCUTS[e.key]()}});

// Expose
globalThis.DB=DB;globalThis.navTo=navTo;
