// listen for a form submit event
let el = document.getElementById("newComment");
if (el) {
    var new_comment = {};
    el.addEventListener("submit", (e) => {
        // prevent the default form behavior
        // serialize the form data into an object
        e.preventDefault();
        var form = document.getElementById("newComment");
        console.log("Submitted form looks like this: ", form);
        let raw_comment = $("form").serializeArray();
        console.log(raw_comment);
        $(raw_comment).each(function (index, obj) {
            new_comment[obj.name] = obj.value;
        });
        // appends the new comment to the DOM only if it successfully adds a comment to the DB
        axios.post('/reviews/comments', new_comment)
            .then(function (httpResponse) {
                // wait for the success response from the server
                console.log("the server has responded with: ", httpResponse);
                // clear the form
                form.reset();
                // add the comment to the page
                var parentnode = document.getElementById("comments");
                console.log(httpResponse.data.comment);
                $(parentnode).append(`
                <div class="card" id="${httpResponse.data.comment._id}">
                <div class="card-block">
                <h4 class="card-title">${httpResponse.data.comment.title}</h4>
                <p class="card-text">${httpResponse.data.comment.content}</p>
                <p>
                <button class="btn btn-link" id="deleteComment-{httpResponse.data.comment._id}" data-comment-id=${httpResponse.data.comment._id}>Delete</button>
                </p>
                </div>
                </div>
                `
                );
            })
    });
}

var commentDeleteButtons = document.querySelectorAll('[id^="deleteComment-"]');
commentDeleteButtons.forEach( (elem) => {
    elem.addEventListener('click', (e) => {
        console.log("click!");
        let commentId = elem.getAttribute('data-comment-id');
        console.log("Deleting comment #", commentId);
        axios.delete(`/reviews/comments/${commentId}`)
            .then(httpResponse => {
                console.log(httpResponse);
                comment = document.getElementById(commentId);
                comment.parentNode.removeChild(comment);
            })
            .catch(error => {
                console.log(error);
            });
    });
});

var reviewDeleteButtons = document.querySelectorAll('[class^="deleteReview"]');
reviewDeleteButtons.forEach( (elem) => {
    console.log("There should b lots of me");
    elem.addEventListener('click', (e) => {
        console.log("click registered");
        let reviewId = elem.getAttribute('data-review-id');
        console.log(reviewId);
        axios.delete(`/admin/delete/${reviewId}`)
            .then(httpResponse => {
            console.log(httpResponse);
            review = document.getElementById(reviewId);
            review.parentNode.removeChild(review);
            })
            .catch( error => {
                console.log("im in the error block");
                console.log(error);
            });
    });
});
