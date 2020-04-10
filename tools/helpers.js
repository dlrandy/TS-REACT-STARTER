
function getEntryJsHtmlPrj() {
  const args = process.argv.slice(3);
  const entryJsPath = args[1];
  const htmlTemplatePath = args[2];
  return [entryJsPath, htmlTemplatePath];
}
module.exports = { getEntryJsHtmlPrj };
