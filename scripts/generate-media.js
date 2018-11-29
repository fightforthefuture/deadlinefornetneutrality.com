const fs = require('fs')
const path = require('path')
const startCase = require('lodash/startCase')
const kebabCase = require('lodash/kebabCase')

function getAssets(dir) {
  if (file.match(/\.(png|jpg|jpeg|gif)$/i)) {
    assets.push(`/social-media/${file}`)
  }
}

async function main() {
  const dir = path.resolve(__dirname, '..', 'static', 'media')
  const assets = {}

  for (let subdir of fs.readdirSync(dir)) {
    const subdirPath = path.resolve(dir, subdir)

    if (fs.lstatSync(subdirPath).isDirectory()) {
      let title, description

      if (fs.existsSync(path.join(subdirPath, 'data.json'))) {
        const data = require(path.join(subdirPath, 'data.json'))
        title = data.title
        description = data.description
        type = data.type
        viewAll = data.viewAll
        externalImages = data.externalImages
      }

      if (!title) {
        title = startCase(subdir.toLowerCase())
      }

      assets[kebabCase(subdir)] = {
        title: title,
        description: description,
        type: type,
        viewAll: viewAll,
        images: []
      }

      if (externalImages) {
        for (let img of externalImages) {
          assets[subdir].images.push(img)
        }
      }

      for (let file of fs.readdirSync(subdirPath)) {
        if (file.match(/\.(png|jpg|jpeg|gif)$/i)) {
          assets[subdir].images.push(`/media/${subdir}/${file}`)
        }
      }
    }
  }

  const dataFile = path.resolve(__dirname, '..', 'assets', 'data', 'media.json')
  fs.writeFileSync(dataFile, JSON.stringify(assets, null, 2))
}

main().catch(console.error)
