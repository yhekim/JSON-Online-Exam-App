//json verisini göstermemiz için  sunucudan çağıracak bir sınıfa gerek verticalAlign:
//XMLHttpRequest()
//BURASI DİREK W3 DEN ALINMADIR

let returnServer;

var connection = new XMLHttpRequest();
connection.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        returnServer = JSON.parse(connection.responseText) //text dönenleri parçalayarak objeye dönüştürür
            //console.log(connection.responseText);
            //console.log(returnServer);
        soruGetir();

    }
    return returnServer;
};
connection.open("GET", "data.json", true); //burada bağlanacağı adres ve methot yazılır
connection.send();

//bağlantı burada bitiyor

const sonucAlani = document.querySelector(".soruGoster");
const soru = document.querySelector("#soru");

const secenekler = document.getElementsByName("secenek");
//console.log(secenekler)

const aciklamaA = document.getElementById("aciklamaA");
const aciklamaB = document.getElementById("aciklamaB");
const aciklamaC = document.getElementById("aciklamaC");
const aciklamaD = document.getElementById("aciklamaD");
const gonderButton = document.getElementById("sinavGonder");
var puan = 0;
var sira = 0;

function soruGetir() {
    secimiTemizle();
    // console.log(returnServer);
    const siradakiSoru = returnServer.sorular[sira];
    soru.innerHTML = siradakiSoru.soru;
    aciklamaA.innerText = siradakiSoru.secenekA;
    aciklamaB.innerText = siradakiSoru.secenekB;
    aciklamaC.innerText = siradakiSoru.secenekC;
    aciklamaD.innerText = siradakiSoru.secenekD;



}

function secimiTemizle() {
    secenekler.forEach(secenek => {
        secenek.checked = false;
    })

}

function secimiAl() {
    var choice;

    secenekler.forEach(selection => {
        if (selection.checked == true) {
            choice = selection.id;

        }

    })
    return choice;

}
gonderButton.addEventListener("click", () => {
    var chosen = secimiAl();

    if (chosen) {
        if (chosen === returnServer.sorular[sira].dogruCevap) {
            puan++;

        }

    }
    sira++;
    if (sira < returnServer.sorular.length) {
        soruGetir();

    } else {
        sonucAlani.innerHTML =
            `<h2>Mevcut sorular içerisinde ${puan}/${returnServer.sorular.length} oranında başarı sağladınız...</h2>`;

        gonderButton.setAttribute("onclick", "location.reload()");
        gonderButton.innerHTML = "Tekrar Dene";


    }
})