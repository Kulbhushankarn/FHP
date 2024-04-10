
    $(document).ready(function () {
        $('.new').click(function (e) {
            e.preventDefault(); // Prevent default link behavior
            $('#popupContainer').load('@Url.Action("EditView", "Home")', function () {
                $('#myModal').modal('show'); // Show modal dialog after content is loaded   
            });
        });
    });
