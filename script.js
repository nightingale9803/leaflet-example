// Initialize map with a center point and zoom level
const map = L.map('map').setView([38, 120], 3) // Initial center and zoom

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// URL to the JSON data (needed if not running a local server)
const dataUrl =
  'https://oracular.obs.cn-central-231.xckpjs.com/project/distribution-data.json'
// Fetch the JSON data
fetch(dataUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json() // Parse the response as JSON
  })
  .then((data) => {
    console.log(data) // Log the data to the console
    data.forEach((coord) => {
      const coordsList = JSON.parse(coord.coords)
      // if coord is null (unknown location), skip
      if (!coordsList) return
      const marker = L.marker([coordsList[0], coordsList[1]]).addTo(map)
      marker.bindTooltip(`
                        <div class="tooltip-content">
                            <p>机构：${coord.location}</p>
                            <p>地点：${coord.country}, ${coord.city || ''}</p>
                            <p>数量：${parseInt(coord.count)}</p>
                        </div>
                    `)
    })
  })
  .catch((error) => {
    console.error(error)
  })
