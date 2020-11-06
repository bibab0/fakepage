
var pageNum = 10; // 每页条数
var outlines = document.getElementById("newsList").getElementsByTagName("li"); //概览记录对象
var pageCount = 0; //总页数
var CP = document.getElementById("pageJump");
var FileBody = document.getElementById("content");
var pageCounttext = document.getElementById("pageCount");

/**
 * getCurrPage(_currentPage)规范跳转页码函数
 * _currentPage 跳转页码输入值
 */
function fakePage(num) {
    pageNum = num;
    if (outlines.length % pageNum > 0) {
        pageCount = ((outlines.length - (outlines.length % pageNum)) / pageNum + 1);
    } else {
        pageCount = outlines.length / pageNum;
    }
    pageCounttext.innerHTML = "共" + pageCount + "页";
    toPage(1);
}
function getCurrPage(_currentPage) {
    var cPage = 1;
    if (_currentPage <= 0 || _currentPage == "")
        cPage = 1;
    else if (_currentPage > pageCount)
        cPage = pageCount;
    else
        cPage = _currentPage;
    return cPage;
}
/**
 * goto()直接跳转函数
 */
function goto() {
    toPage(CP.value);
}
function toPage(_pageNum) {
    var cP = getCurrPage(_pageNum);
    var startPos = cP * pageNum - pageNum;
    var endPos = 0;
    if (cP * pageNum > outlines.length)
        endPos = outlines.length;
    else
        endPos = cP * pageNum;
    for (var i = 0; i < outlines.length; i++) {
        if ((i >= startPos) && (i < endPos)) {
            outlines[i].style.display = "block";
            if (!((i + 1) % 5)) {
                //					outlines[i].className="liE";
            }
            if (i == (endPos - 1)) {
                //					outlines[i].className="liE liE2";
            }
        } else {
            outlines[i].style.display = "none";
        }
    }
    CP.value = cP;
    showPageLineNum();
    return false;
}
/**
 * showPageLineNum()页面显示状态条函数
 */
function showPageLineNum() {
    var pL = "";
    if (CP.value != 1) {
        pL += "<a href='javascript:void(0);'  onclick='toPage(" + (CP.value - 1) + ")'>上一页</a>";
    } else {
        pL += "<span class='sDisable'>上一页</span>";
    }
    for (var pageN = 1; pageN <= pageCount; pageN++) {
        if (pageN == CP.value) {
            //pL += "<strong>"+pageN+"</strong>";
        } else {
            //pL += "<a href='javascript:void(0);' onclick='toPage("+pageN+")'>"+pageN+"</a>";
        }
    }
    if (CP.value < pageCount) {
        pL += "<a href='javascript:void(0);' onclick='toPage(" + ((CP.value) * 1 + 1) + ")' id='next'>下一页</a>";
} else {
        pL += "<span class='sDisable' id='next'>下一页</span>";
    }
    document.getElementById("pageDec").innerHTML = pL;
}
