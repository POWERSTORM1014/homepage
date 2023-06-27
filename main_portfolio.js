window.onload = async function () {
  // Setting initial height for the image element
  let imageElement = document.getElementById('imagePlaceholder')
  imageElement.style.height = '650px' // Set the initial height to 650px

  // Adjusting height of the image element upon window resize
  window.onresize = function () {
    let imageParentElement = imageElement.parentElement
    imageElement.style.height = imageParentElement.offsetHeight + 'px'
  }

  let categoryDropdown = document.getElementById('select-category')
  let subcategoryDropdown = document.getElementById('select-subcategory')
  let subsubcategoryDropdown = document.getElementById('select-subsubcategory')
  let subsubcategory2Dropdown = document.getElementById(
    'select-subsubcategory2'
  )
  const db = firebase.firestore()

  // Fetch and fill Category1
  const categorySnapshot = await db.collection('Category1').get()
  categorySnapshot.forEach((doc) => {
    let option = document.createElement('option')
    option.value = doc.id
    option.text = doc.data().name
    categoryDropdown.add(option)
  })

  // Fetch and fill Category2 based on selected Category1
  categoryDropdown.onchange = async function () {
    subcategoryDropdown.length = 1 // clear previous options

    if (this.value === '') return // no category selected

    const subcategorySnapshot = await db
      .collection('Category1')
      .doc(this.value)
      .collection('Category2')
      .get()
    subcategorySnapshot.forEach((doc) => {
      let option = document.createElement('option')
      option.value = doc.id
      option.text = doc.data().name
      subcategoryDropdown.add(option)
    })
  }

  // Fetch and fill Category3 based on selected Category2
  subcategoryDropdown.onchange = async function () {
    subsubcategoryDropdown.length = 1 // clear previous options

    if (this.value === '') return // no subcategory selected

    const subsubcategorySnapshot = await db
      .collection('Category1')
      .doc(categoryDropdown.value)
      .collection('Category2')
      .doc(this.value)
      .collection('Category3')
      .get()
    subsubcategorySnapshot.forEach((doc) => {
      let option = document.createElement('option')
      option.value = doc.id
      option.text = doc.data().name
      subsubcategoryDropdown.add(option)
    })
  }

  // Fetch and fill Category4 based on selected Category3
  subsubcategoryDropdown.onchange = async function () {
    subsubcategory2Dropdown.length = 1 // clear previous options

    if (this.value === '') return // no subsubcategory selected

    const subsubcategory2Snapshot = await db
      .collection('Category1')
      .doc(categoryDropdown.value)
      .collection('Category2')
      .doc(subcategoryDropdown.value)
      .collection('Category3')
      .doc(this.value)
      .collection('Category4')
      .get()
    subsubcategory2Snapshot.forEach((doc) => {
      let option = document.createElement('option')
      option.value = doc.id
      option.text = doc.data().name
      subsubcategory2Dropdown.add(option)
    })
  }
  // Fetch and display contents based on selected Category4
  subsubcategory2Dropdown.onchange = async function () {
    if (this.value === '') return // no subsubcategory2 selected

    const contentSnapshot = await db
      .collection('Category1')
      .doc(categoryDropdown.value)
      .collection('Category2')
      .doc(subcategoryDropdown.value)
      .collection('Category3')
      .doc(subsubcategoryDropdown.value)
      .collection('Category4')
      .doc(this.value)
      .collection('contents')
      .get()

    let contentArea = document.getElementById('content-area')
    contentArea.innerHTML = ''

    contentSnapshot.forEach((doc) => {
      if (doc.exists) {
        let contentName = doc.data().name
        let contentData = doc.data().content

        let contentList = document.createElement('div')
        contentList.classList.add('content-list')
        contentList.style.display = 'flex' // Add this line to set the display property to flex
        contentList.style.justifyContent = 'space-between' // Add this line to align items with space in between

        let contentText = document.createElement('div') // Change this line to create a div instead of a text node
        contentText.innerText = contentName + ' ' // Change this line to use innerText instead of nodeValue
        contentText.style.textAlign = 'left' // Add this line to align the text to the left

        let playButton = document.createElement('button')
        playButton.innerText = 'Play'
        playButton.classList.add('play-button')
        playButton.style.marginLeft = 'auto' // Add this line to push the button to the right

        playButton.addEventListener('click', function () {
          let imageElement = document.getElementById('imagePlaceholder')
          imageElement.src = contentData // Use contentData instead of imageUrl
          imageElement.style.objectFit = 'cover' // Use 'cover' instead of 'contain'
          imageElement.style.height = '100%'
          imageElement.style.width = 'auto'
          imageElement.style.display = 'block'
          imageElement.style.margin = 'auto'

          // Add this part to check the height of the parent element of the image
          let imageParentElement = imageElement.parentElement
          console.log(imageParentElement.offsetHeight)
        })

        contentList.appendChild(contentText)
        contentList.appendChild(playButton)

        contentArea.appendChild(contentList)
      } else {
        console.log('해당 문서가 존재하지 않습니다!')
      }
    })
  }
}
