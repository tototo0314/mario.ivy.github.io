// スライダーに表示する画像のパス
var imgList = [
	"images/downloa.jpg",
	"images/p.jpg",
	"images/imags.jpg",
	"images/im.jpg",
	"images/imges.jpg",
];

// 画像とナビの要素を自動で追加
for(var i = 0; i < imgList.length; i++) {
	var slide = document.createElement("li");
	slide.innerHTML = "<img src='" + imgList[i] + "'>";
	document.getElementsByClassName("slider-inner")[0].appendChild(slide);

	var nav = document.createElement("li");
	nav.setAttribute("data-nav-index", i);
	document.getElementsByClassName("nav")[0].appendChild(nav);
	document.getElementsByClassName("nav") [0].appendChild(nav);
}

var length = imgList.length - 1;
var imageSlide = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");
var dotNavigation = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
var nowIndex = 0;
imageSlide[nowIndex].classList.add("show");
dotNavigation[nowIndex].classList.add("current");
var isChanging = false;
var slideTimer;
function sliderSlide(val) {
	if (isChanging === true) {
		return false;
	}
	isChanging = true;
	// 現在表示している画像とナビからクラス名を削除
	imageSlide[nowIndex].classList.remove("show");
	dotNavigation[nowIndex].classList.remove("current");
	nowIndex = val;
	// 次に表示するスライドとナビにカレントクラスを設定
	imageSlide[nowIndex].classList.add("show");
	dotNavigation[nowIndex].classList.add("current");
	// アニメーションが終わるタイミングでisChangingのステータスをfalseに
	slideTimer = setTimeout(function(){
		isChanging = false;
	}, 600);
}

// 左矢印のナビをクリックした時のイベント
document.getElementById("arrow-prev").addEventListener("click", function(){
	var index = nowIndex - 1;
	if(index < 0){
	  index = length;
	}
	sliderSlide(index);
}, false);
// 右矢印のナビをクリックした時のイベント
document.getElementById("arrow-next").addEventListener("click", function(){
	var index = nowIndex + 1;
	if(index > length){
	  index = 0;
	}
	sliderSlide(index);
}, false);
// ドットナビをクリックした時のイベントを作成
for(var i = 0; i < dotNavigation.length; i++) {
	// データ属性のインデックス番号を元にスライドを行う
	dotNavigation[i].addEventListener("click", function(){
		var index = Number(this.getAttribute("data-nav-index"));
		sliderSlide(index);
	}, false);
}
function addImage(imagePath) {
    imgList.push(imagePath); // 画像パスを配列に追加
    renderSlider();         // スライダーを再レンダリング
}


function renderSlider() {
    const sliderInner = document.getElementsByClassName("slider-inner")[0];
    const nav = document.getElementsByClassName("nav")[0];

    // 一旦既存のスライドとナビをクリア
    sliderInner.innerHTML = "";
    nav.innerHTML = "";

    // 画像とナビを追加
    for (var i = 0; i < imgList.length; i++) {
        var slide = document.createElement("li");
        slide.innerHTML = "<img src='" + imgList[i] + "'>";
        sliderInner.appendChild(slide);

        var navItem = document.createElement("li");
        navItem.setAttribute("data-nav-index", i);
        nav.appendChild(navItem);
    }

    // スライドの再初期化
    initSlider();
}

function initSlider() {
    // スライドの数を取得
    length = imgList.length - 1;

    // クラス名「imageSlide」と「dotNavigation」に要素を格納
    imageSlide = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");
    dotNavigation = document.getElementsByClassName("nav")[0].getElementsByTagName("li");

    // 現在表示しているスライドにクラスを付与
    nowIndex = 0;
    Array.from(imageSlide).forEach(slide => slide.classList.remove("show"));
    Array.from(dotNavigation).forEach(dot => dot.classList.remove("current"));

    imageSlide[nowIndex].classList.add("show");
    dotNavigation[nowIndex].classList.add("current");

    // ドットナビクリックイベントを再設定
    for (var i = 0; i < dotNavigation.length; i++) {
        dotNavigation[i].addEventListener("click", function () {
            var index = Number(this.getAttribute("data-nav-index"));
            sliderSlide(index);
        }, false);
    }
}

addImage("images/img05.jpg");
// 6枚目の画像（インデックス5）を削除
imgList.splice(5, 1);  // 5番目のインデックス（6枚目の画像）を削除

// スライダーを再レンダリング
renderSlider();
