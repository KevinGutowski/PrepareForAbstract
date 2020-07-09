import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  let document = sketch.getSelectedDocument()

  let artboardsWithoutProperSettings = []
  document.pages.forEach(page => {
    const artboards = page.layers.filter(layer => layer.type == "Artboard")
    const abdsWithCorrectPreset = artboards.filter(artboard => artboard.sketchObject.preset().name() == "Gradescope #1")

    if (abdsWithCorrectPreset.length == 0) { return }
    abdsWithCorrectPreset.forEach(artboard => {
      if (artboard.background.enabled != true || artboard.background.color != "#ffffffff") {
        artboardsWithoutProperSettings.push(artboard)
        artboard.background.enabled = true
        artboard.background.color = "#ffffffff"
      }
    })
  })

  sketch.UI.message(`${artboardsWithoutProperSettings.length} ${artboardOrArtboards()} corrected for Abstract.`)

  function artboardOrArtboards() {
    if (artboardsWithoutProperSettings.length == 1) {
      return "artboard"
    } else {
      return "artboards"
    }
  }
}
