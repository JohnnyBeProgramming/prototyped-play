function ReportRefresh() {
    setTimeout(function () {
        var elem = document.getElementById('RefreshList');
        if (elem) {
            elem.click();
        } else {
            elem = document.getElementById('RefreshSummary');
            if (elem) {
                elem.click();
            }
        }
    }, 1000)
}