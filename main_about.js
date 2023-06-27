window.onload = async function () {
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
        let contentLink = doc.data().content

        let contentList = document.createElement('div')
        contentList.classList.add('content-list')

        let contentText = document.createTextNode(contentName + ' ')
        let playButton = document.createElement('button')
        playButton.innerText = 'Play'
        playButton.classList.add('play-button')

        playButton.addEventListener('click', function () {
          videoPlayer.src = contentLink
          videoPlayer.scrollIntoView({ behavior: 'smooth' })
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
