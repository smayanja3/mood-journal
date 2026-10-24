const editForm = document.querySelector('#editForm')
const deleteBtns = document.querySelectorAll('.deleteBtn')

// ---------------------- EDIT FORM  ----------------------//
//------- PUT/ UPDATE
if (editForm) {
    editForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const form = document.getElementById('editForm')
        const id = form.dataset.id

        const updatedEntry = {
            date: document.querySelector('[name= "date"]').value,
            mood: document.querySelector('[name= "mood"]').value,
            journal: document.querySelector('[name= "journal"]').value,
            tags: document.querySelector('[name= "tags"]').value,
            moodScale: document.querySelector('[name= "moodScale"]').value,
        }

        console.log('sending', id, updatedEntry)

        fetch(`/entries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEntry) 
        })

        .then(res => {
            console.log('server answered:', res.status, res.ok)
            if(res.ok) {
                window.location.href = `/entries`
            } else {
                return res.json().then(data => {
                    document.getElementById('error-message').innerText = data.error
                })
            }
        })
    })
}

//---------------------- DELETE  ----------------------//
//------- DELETE/REMOVE
// since ever entry has a delete button i need a forEach loop like my add page

deleteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const sure = confirm('Delete this mood entry ?')

        if (!sure) return // <-- another pop up im thinkin Clicked cancel so STOP

        const id = this.dataset.id
        console.log('deleting', id)

        fetch(`/entries/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                console.log('server approved:', res.status, res.ok)
                if (res.ok) {
                    window.location.href = ('/entries') 
                } else {
                    return res.json().then(data => {
                        document.getElementById('error-message').innerText = data.error
                    })
                }
            })
    })
}
)
    