$(document).ready(function () {

    let books = [];

    // ADD BOOK
    $("#bookForm").submit(function (event) {

        event.preventDefault();

        let book = {
            title: $("#title").val(),
            author: $("#author").val(),
            borrower: $("#borrower").val(),
            dueDate: $("#dueDate").val(),
            genre: $("#genre").val(),
            returned: false
        };

        books.push(book);

        displayBooks();

        $("#bookForm")[0].reset();

    });


    // DISPLAY BOOKS
    function displayBooks() {

        $("#bookTable").empty();

        let totalLoans = 0;
        let overdueLoans = 0;

        books.forEach(function (book, index) {

            let today = new Date();
            today.setHours(0, 0, 0, 0);

            let due = new Date(book.dueDate + "T00:00:00");

            let status;

            if (book.returned) {
                status = "Returned";
            }

            else if (due < today) {
                status = "Overdue";
                totalLoans++;
                overdueLoans++;
            }

            else {
                status = "Lent";
                totalLoans++;
            }

            let statusBadge;

            if (status === "Overdue") {
                statusBadge = '<span class="badge bg-danger">Overdue</span>';
            }

            else if (status === "Returned") {
                statusBadge = '<span class="badge bg-success">Returned</span>';
            }

            else {
                statusBadge = '<span class="badge bg-primary">Lent</span>';
            }

            let actionButton = book.returned
                ? '<span class="text-muted">Completed</span>'
                : `<button class="btn btn-success btn-sm return-btn" data-index="${index}">Return</button>`;

            let row = `
                <tr>
                    <td>${escapeHTML(book.title)}</td>
                    <td>${escapeHTML(book.author)}</td>
                    <td>${escapeHTML(book.borrower)}</td>
                    <td>${book.dueDate}</td>
                    <td>${escapeHTML(book.genre)}</td>
                    <td>${statusBadge}</td>
                    <td>${actionButton}</td>
                </tr>
            `;

            $("#bookTable").append(row);

        });

        $("#totalLoans").text(totalLoans);
        $("#overdueLoans").text(overdueLoans);

    }


    // PREVENT HTML INJECTION
    function escapeHTML(value) {
        return $("<div>").text(value).html();
    }


    // RETURN BOOK
    $("#bookTable").on("click", ".return-btn", function () {

        let index = $(this).data("index");

        books[index].returned = true;

        displayBooks();

    });

});
