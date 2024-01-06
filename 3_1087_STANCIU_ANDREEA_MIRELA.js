// Parametri comuni pt cei 3 indicatori:
let jsonTotal = [];
var tari = ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE"];
var ani = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
var indicatori = ["SV", "POP", "PIB"]


//#region Preluare date SV - Cerinta 1

//-------------------------------SPERANTA LA VIATA-------------------------------
/*link speranta viata:
http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_mlexpec?time=2004&time=2005&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&precision=1&sex=T&geo=BE&geo=BG&geo=CZ&geo=DK&geo=DE&geo=EE&geo=IE&geo=EL&geo=ES&geo=FR&geo=HR&geo=IT&geo=CY&geo=LV&geo=LT&geo=LU&geo=HU&geo=MT&geo=NL&geo=AT&geo=PL&geo=PT&geo=RO&geo=SI&geo=SK&geo=FI&geo=SE&unit=YR&age=Y1
*/

// Parametri pt SPERANTA LA VIATA:
let jsonSperanta = [];

var datasetCodeSV = "demo_mlexpec";
var precisionSV = "precision=1&sex=T";
var unitAgeSV = "unit=YR&age=Y1";


// Construire URL pentru SPERANTA DE VIATA
function construireUrlSperantaViata() {
    var url = `https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/`
    url += datasetCodeSV;

    url += "?" + ani.map(an => `time=${an}`).join("&");
    url += "&" + precisionSV;
    url += "&" + tari.map(tara => `geo=${tara}`).join("&");

    url += "&" + unitAgeSV;
    return url;
}

// Construire array de obiecte pentru SPERANTA DE VIATA (reconstruire json cerinta 1)
async function dateSperantaViata() {

    let urlSperanta = construireUrlSperantaViata();

    let raspunsSperantaViata = await fetch(urlSperanta);
    let dateSperantaViata = await raspunsSperantaViata.json();

    let indexObiect = 0;

    for (i = 0; i < tari.length; i++)
        for (j = 0; j < ani.length; j++) {
            jsonSperanta.push({
                "tara": tari[i],
                "an": ani[j],
                "indicator": indicatori[0],
                "valoare": dateSperantaViata.value[indexObiect]
            });
            indexObiect++;
        }
    console.log('SPERANTA LA VIATA:')
    console.log(jsonSperanta);
}

//#endregion

//#region Preluare date POP - Cerinta 1
//-------------------------------POPULATIE-------------------------------
/*link Populatie
http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_pjan?precision=1&sex=T&time=2004&time=2005&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&geo=BE&geo=BG&geo=CZ&geo=DK&geo=DE&geo=EE&geo=IE&geo=EL&geo=ES&geo=FR&geo=HR&geo=IT&geo=CY&geo=LV&geo=LT&geo=LU&geo=HU&geo=MT&geo=NL&geo=AT&geo=PL&geo=PT&geo=RO&geo=SI&geo=SK&geo=FI&geo=SE&age=TOTAL
*/
// Parametri pt POPULATIE:
let jsonPopulatie = [];

var datasetCodePOP = "demo_pjan";
var precisionPOP = "precision=1&sex=T";
var agePOP = "age=TOTAL";


// Construire URL pentru POPULATIE
function construireUrlPopulatie() {
    var url = `https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/`
    url += datasetCodePOP;
    url += "?" + precisionPOP;
    url += "&" + ani.map(an => `time=${an}`).join("&");
    url += "&" + tari.map(tara => `geo=${tara}`).join("&");
    url += "&" + agePOP;
    return url;
}

// Construire array de obiecte pentru POPULATIE (reconstruire json cerinta 1)
async function datePopulatie() {

    let urlPopulatie = construireUrlPopulatie();
    let raspunsPopulatie = await fetch(urlPopulatie);
    let datePopulatie = await raspunsPopulatie.json();

    let indexObiect = 0;

    for (i = 0; i < tari.length; i++)
        for (j = 0; j < ani.length; j++) {
            jsonPopulatie.push({
                "tara": tari[i],
                "an": ani[j],
                "indicator": indicatori[1],
                "valoare": datePopulatie.value[indexObiect]
            });
            indexObiect++;
        }
    console.log('POPULATIE:')
    console.log(jsonPopulatie);
}
//#endregion

//#region Preluare date PIB - Cerinta 1
//-------------------------------PIB-------------------------------
/*link PIB
http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/sdg_08_10?na_item=B1GQ&precision=1&unit=CLV10_EUR_HAB&time=2004&time=2005&time=2006&time=2007&time=2008&time=2009&time=2010&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&time=2018&geo=BE&geo=BG&geo=CZ&geo=DK&geo=DE&geo=EE&geo=IE&geo=EL&geo=ES&geo=FR&geo=HR&geo=IT&geo=CY&geo=LV&geo=LT&geo=LU&geo=HU&geo=MT&geo=NL&geo=AT&geo=PL&geo=PT&geo=RO&geo=SI&geo=SK&geo=FI&geo=SE
*/
// Parametri pt PIB:
let jsonPib = [];

var datasetCodePIB = "sdg_08_10?na_item=B1GQ";
var precisionPIB = "precision=1&sex=T";


// Construire URL pentru PIB
function construireUrlPib() {
    var url = `https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/`
    url += datasetCodePIB;
    url += "&" + precisionPIB;
    url += "&" + ani.map(an => `time=${an}`).join("&");
    url += "&" + tari.map(tara => `geo=${tara}`).join("&");
    return url;
}

// Construire array de obiecte pentru PIB (reconstruire json cerinta 1)
async function datePib() {

    let urlPib = construireUrlPib();
    let raspunsPib = await fetch(urlPib);
    let datePib = await raspunsPib.json();

    let indexObiect = 0;

    for (i = 0; i < tari.length; i++)
        for (j = 0; j < ani.length; j++) {
            jsonPib.push({
                "tara": tari[i],
                "an": ani[j],
                "indicator": indicatori[2],
                "valoare": datePib.value[indexObiect]
            });
            indexObiect++;
        }
    console.log('PIB:')
    console.log(jsonPib);
}
//#endregion


//#region Populare controale de tip Select - Cerinta 2
//populez selecturile pentru cerinta 2
let selectTara;
let selectIndicator;
function populeazaSelecturi() {
    selectTara = document.querySelector('#tara');
    for (i = 0; i < tari.length; i++) {
        let optiuneTara = document.createElement('option');
        optiuneTara.value = tari[i];
        optiuneTara.innerText = tari[i];
        selectTara.append(optiuneTara);
    }

    selectIndicator = document.querySelector('#indicator');
    for (i = 0; i < indicatori.length; i++) {
        let optiuneIndicator = document.createElement('option');
        optiuneIndicator.value = indicatori[i];
        optiuneIndicator.innerText = indicatori[i];
        selectIndicator.append(optiuneIndicator);
    }
}
//#endregion

//#region Construire array-uri pentru grafic - Cerinta 2
//fac 3 array de arrayuri cu tari si toate valorile pe ani in arrayurile mici
let vectorSV = new Array(tari.length);
let vectorPOP = new Array(tari.length);
let vectorPIB = new Array(tari.length);

function construire3ArrayuriCuValoriPeTariSiAni() {

    var aux = 0;
    for (var i = 0; i < tari.length; i++) {
        vectorSV[i] = new Array(ani.length);
        vectorPOP[i] = new Array(ani.length);
        vectorPIB[i] = new Array(ani.length);
        for (var j = 0; j < ani.length; j++) {
            vectorSV[i][j] = jsonSperanta[aux].valoare; //i pt tari, j pt valoare ca sa mi fac un array de arrayuri. Arrayurile mici contin datele specifice fiecarei tari
            vectorPOP[i][j] = jsonPopulatie[aux].valoare;
            vectorPIB[i][j] = jsonPib[aux].valoare;
            aux++;
        }
    }
}
//#endregion

//#region Construire Grafic - Cerinte 2 si 3
let svg;
function deseneazaGrafic() {

    construire3ArrayuriCuValoriPeTariSiAni()

    let indicatorSelect = indicatori.find(item => item === document.querySelector('#indicator').value);
    let taraSelect = tari.find(item => item === document.querySelector('#tara').value);

    //determin setul de date corespunzator indicatorului selectat, pt grafic (TODO: de extras intr-o functie)
    let vectorGrafic;
    if (indicatorSelect == "SV")
        vectorGrafic = vectorSV;
    else if (indicatorSelect == "POP")
        vectorGrafic = vectorPOP;
    else
        vectorGrafic = vectorPIB;

    //fetermin indexul tarii selectate, pt grafic
    let indexTara;
    for (i = 0; i < tari.length; i++) {
        if (tari[i] == taraSelect)
            indexTara = i;
    }

    //desenare grafic cunoscand vectorGrafic si indexTara
    svg = document.getElementById("idSvg");
    svg.style.display = "block";
    //golesc continutul svg-ului pt vizualizarea repetata a mai multor grafice
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
    let W = svg.getAttribute('width');
    let H = svg.getAttribute('height');
    let w = W / 14;

    let points = '';
    for (let i = 0; i < ani.length; i++) {
        let x = i * w;
        let h = H * vectorGrafic[indexTara][i] / (Math.max(...vectorGrafic[indexTara]));
        let y = (H - h) * 5;//fata de seminar modific cu * 5 pentru ca diferentele intre valori sunt mici la SV si vreau sa fie vizibile,
        //TODO: de gasit o formula care sa depinda de indicatorul ales sa se vada bine grafic pt toti indicatorii
        points += x.toString() + ',' + y.toString() + ' ';

    }

    let linie = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    linie.setAttribute('points', points);
    svg.append(linie);

    linie.addEventListener('mouseenter', (e) => {


        /*
        let y = e.pageY;
        y = y / 5;
        y = H - y; // in acest mom in y este h
        y = y / H;
        y = y/
        */

        let x = e.pageX;
        x = x / w;
        x = Math.round(x);// acum x este i
        let an = ani[x];
        let valoare = vectorGrafic[indexTara][x];

        let tooltip = document.getElementById("tooltip");
        tooltip.textContent = `Tara ${tari[indexTara]} `;
        tooltip.append(`Indicator ${indicatorSelect} `);
        tooltip.append(`An ${an} `);
        tooltip.append(`Valoare ${valoare} `); //TODO inserat randuri goale, nu merge cu \n
        tooltip.style.display = "block";
        tooltip.style.left = (e.pageX + 5) + 'px';
        tooltip.style.top = (e.pageY + 5) + 'px';
    });
    linie.addEventListener('mouseleave', () => {
        let tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";

    });

}
//#endregion


//#region Populare controale de tip Select - Cerinta 4
let selectAnBubble;
function populeazaSelecturiBubble() {
    selectAnBubble = document.querySelector('#anBubble');
    for (i = 0; i < ani.length; i++) {
        let optiuneAn = document.createElement('option');
        optiuneAn.value = ani[i];
        optiuneAn.innerText = ani[i];
        selectAnBubble.append(optiuneAn);
    }
}
//#endregion

//#region Construire array pentru Bubble Chart - Cerinta 4
//fac un array de ani(15) de tari(26) de valori(3, pt indicatori), adica un array tridimensional care contine pt fiecare an, pt fiecare tara valorile celor 3 indicatori
let vectorBubble = new Array(ani.length);

function construireArrayBubble() {

    for (var i = 0; i < ani.length; i++) {
        vectorBubble[i] = new Array(tari.length);
        var aux = i * tari.length;
        for (var j = 0; j < tari.length; j++) {
            vectorBubble[i][j] = new Array(3);

            vectorBubble[i][j][0] = jsonPopulatie[aux].valoare;
            vectorBubble[i][j][1] = jsonPib[aux].valoare;
            vectorBubble[i][j][2] = jsonSperanta[aux].valoare / 4;//impart la 4 ca sa nu fie ff mari cerculetele
            aux++;

        }
    }
    console.log(vectorBubble);
}
//#endregion

//#region Construire Bubble Chart - Cerinta 4
let indexAnSelectat;
function preiaSelectAn() {
    let anSelect = document.querySelector('#anBubble').value;

    for (i = 0; i < ani.length; i++) {
        if (ani[i] == anSelect)
            indexAnSelectat = i;
    }
    console.log(indexAnSelectat);
}

function deseneazaBubbleChart(indexAn) {

    //selectez anul si generez bubble chart pt toate tarile avand 3 dimensiuni din indicatori

    console.log(indexAn);

    construireArrayBubble()

    div = document.getElementById("idDiv");
    div.style.display = "block";

    var Canvas = document.getElementById("popChart");

    //const context = Canvas.getContext('2d');

    //context.clearRect(0, 0, canvas.width, canvas.height);

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    //construiesc un vector de culori generate aleator pt bubble chart
    let culoriBubble = new Array(tari.length);
    for (i = 0; i < culoriBubble.length; i++) {
        culoriBubble[i] = '#' + parseInt(Math.random() * 0xFF1493).toString(16);
    }


    var dateBubble = {
        datasets: [{

            label: ['Dimensiunea bubble-urilor conform Sperantei la Viata'],

            data: [//TODO: de extras in json sa nu mai hardcodez

                { x: vectorBubble[indexAn][1][0], y: vectorBubble[indexAn][1][1], r: vectorBubble[indexAn][1][2] },
                { x: vectorBubble[indexAn][2][0], y: vectorBubble[indexAn][2][1], r: vectorBubble[indexAn][2][2] },
                { x: vectorBubble[indexAn][3][0], y: vectorBubble[indexAn][3][1], r: vectorBubble[indexAn][3][2] },
                { x: vectorBubble[indexAn][4][0], y: vectorBubble[indexAn][4][1], r: vectorBubble[indexAn][4][2] },
                { x: vectorBubble[indexAn][5][0], y: vectorBubble[indexAn][5][1], r: vectorBubble[indexAn][5][2] },
                { x: vectorBubble[indexAn][6][0], y: vectorBubble[indexAn][6][1], r: vectorBubble[indexAn][6][2] },
                { x: vectorBubble[indexAn][7][0], y: vectorBubble[indexAn][7][1], r: vectorBubble[indexAn][7][2] },
                { x: vectorBubble[indexAn][8][0], y: vectorBubble[indexAn][8][1], r: vectorBubble[indexAn][8][2] },
                { x: vectorBubble[indexAn][9][0], y: vectorBubble[indexAn][9][1], r: vectorBubble[indexAn][9][2] },
                { x: vectorBubble[indexAn][10][0], y: vectorBubble[indexAn][10][1], r: vectorBubble[indexAn][10][2] },
                { x: vectorBubble[indexAn][11][0], y: vectorBubble[indexAn][11][1], r: vectorBubble[indexAn][11][2] },
                { x: vectorBubble[indexAn][12][0], y: vectorBubble[indexAn][12][1], r: vectorBubble[indexAn][12][2] },
                { x: vectorBubble[indexAn][13][0], y: vectorBubble[indexAn][13][1], r: vectorBubble[indexAn][13][2] },
                { x: vectorBubble[indexAn][14][0], y: vectorBubble[indexAn][14][1], r: vectorBubble[indexAn][14][2] },
                { x: vectorBubble[indexAn][15][0], y: vectorBubble[indexAn][15][1], r: vectorBubble[indexAn][15][2] },
                { x: vectorBubble[indexAn][16][0], y: vectorBubble[indexAn][16][1], r: vectorBubble[indexAn][16][2] },
                { x: vectorBubble[indexAn][17][0], y: vectorBubble[indexAn][17][1], r: vectorBubble[indexAn][17][2] },
                { x: vectorBubble[indexAn][18][0], y: vectorBubble[indexAn][18][1], r: vectorBubble[indexAn][18][2] },
                { x: vectorBubble[indexAn][19][0], y: vectorBubble[indexAn][19][1], r: vectorBubble[indexAn][19][2] },
                { x: vectorBubble[indexAn][20][0], y: vectorBubble[indexAn][20][1], r: vectorBubble[indexAn][20][2] },
                { x: vectorBubble[indexAn][21][0], y: vectorBubble[indexAn][21][1], r: vectorBubble[indexAn][21][2] },
                { x: vectorBubble[indexAn][22][0], y: vectorBubble[indexAn][22][1], r: vectorBubble[indexAn][22][2] },
                { x: vectorBubble[indexAn][23][0], y: vectorBubble[indexAn][23][1], r: vectorBubble[indexAn][23][2] },
                { x: vectorBubble[indexAn][24][0], y: vectorBubble[indexAn][24][1], r: vectorBubble[indexAn][24][2] },
                { x: vectorBubble[indexAn][25][0], y: vectorBubble[indexAn][25][1], r: vectorBubble[indexAn][25][2] },
                { x: vectorBubble[indexAn][26][0], y: vectorBubble[indexAn][26][1], r: vectorBubble[indexAn][26][2] }

            ],
            backgroundColor: culoriBubble

        }

        ]
    };

    var bubbleChart = new Chart(Canvas, {
        type: 'bubble',
        data: dateBubble,
        options: {

            onHover:
                function (e) {
                    //break;
                    preventDefault();

                },

            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Produs Intern Brut'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Populatie'
                    }
                }]
            }

        }
    });

}
//#endregion

//#region Construire animatie Bubble Chart - Cerinta 5
let indexAnimatie = 0;
let oprire;

function animatie() {
    indexAnimatie = indexAnimatie + 1;
    if (indexAnimatie < ani.length) {
        deseneazaBubbleChart(indexAnimatie);
    }
    else {
        indexAnimatie = 0;
        clearInterval(oprire);
    }
    console.log(indexAnimatie);
}
//#endregion


//#region Populare control de tip Select - Cerinta 6
let selectAnTabel;
function populeazaSelecturiTabel() {
    selectAnTabel = document.querySelector('#anTabel');
    for (i = 0; i < ani.length; i++) {
        let optiuneAn = document.createElement('option');
        optiuneAn.value = ani[i];
        optiuneAn.innerText = ani[i];
        selectAnTabel.append(optiuneAn);
    }
}
//#endregion

//#region Construire array pentru Tabel - Cerinta 6
//fac un array de ani(15) de tari(26) de valori(3, pt indicatori), adica un array tridimensional care contine pt fiecare an, pt fiecare tara valorile celor 3 indicatori
let vectorTabel = new Array(ani.length);

function construireArrayTabel() {

    for (var i = 0; i < ani.length; i++) {
        vectorTabel[i] = new Array(tari.length);
        var aux = i * tari.length;
        for (var j = 0; j < tari.length; j++) {
            vectorTabel[i][j] = new Array(3);

            vectorTabel[i][j][0] = jsonSperanta[aux].valoare;
            vectorTabel[i][j][1] = jsonPopulatie[aux].valoare;
            vectorTabel[i][j][2] = jsonPib[aux].valoare;
            aux++;

        }
    }
    console.log(vectorTabel);
}



//#endregion

//#region Construire vectori de medii - Cerinta 6
//imi fac 3 vectori de lungime 15 care contin mediile pe cei 15 ani pt fiecare indicator
let vectorMediiSV = new Array(ani.length);
let vectorMediiPOP = new Array(ani.length);
let vectorMediiPIB = new Array(ani.length);

let vectorAmplitudiniSV = new Array(ani.length);
let vectorAmplitudiniPOP = new Array(ani.length);
let vectorAmplitudiniPIB = new Array(ani.length);


function calculeazaMedii() {
    for (k = 0; k < ani.length; k++) {
        vectorAmplitudiniSV[k] = new Array(2);
        vectorAmplitudiniPOP[k] = new Array(2);
        vectorAmplitudiniPIB[k] = new Array(2);
    }


    for (k = 0; k < ani.length; k++) {
        let sumaPeAnSV = 0;
        let sumaPeAnPOP = 0;
        let sumaPeAnPIB = 0;

        let minSV, maxSV;
        let minPIB, maxPIB;
        let minPOP, maxPOP;

        minSV = maxSV = vectorTabel[k][0][0];
        minPIB = maxPIB = vectorTabel[k][0][2];
        minPOP = maxPOP = vectorTabel[k][0][1];



        for (i = 0; i < tari.length; i++) {
            sumaPeAnSV = sumaPeAnSV + vectorTabel[k][i][0];
            sumaPeAnPOP = sumaPeAnPOP + vectorTabel[k][i][1];
            sumaPeAnPIB = sumaPeAnPIB + vectorTabel[k][i][2];

            if (minSV > vectorTabel[k][i][0])
                minSV = vectorTabel[k][i][0];
            if (minPIB > vectorTabel[k][i][2])
                minPIB = vectorTabel[k][i][2];
            if (minPOP > vectorTabel[k][i][1])
                minPOP = vectorTabel[k][i][1];

            if (maxSV < vectorTabel[k][i][0])
                maxSV = vectorTabel[k][i][0];
            if (maxPIB < vectorTabel[k][i][2])
                maxPIB = vectorTabel[k][i][2];
            if (maxPOP < vectorTabel[k][i][1])
                maxPOP = vectorTabel[k][i][1];
        }
        vectorMediiSV[k] = sumaPeAnSV / 27;
        vectorMediiPOP[k] = sumaPeAnPOP / 27;
        vectorMediiPIB[k] = sumaPeAnPIB / 27;

        vectorAmplitudiniSV[k][0] = vectorMediiSV[k] - minSV;
        vectorAmplitudiniSV[k][1] = maxSV - vectorMediiSV[k];

        vectorAmplitudiniPOP[k][0] = vectorMediiPOP[k] - minPOP;
        vectorAmplitudiniPOP[k][1] = maxPOP - vectorMediiPOP[k];

        vectorAmplitudiniPIB[k][0] = vectorMediiPIB[k] - minPIB;
        vectorAmplitudiniPIB[k][1] = maxPOP - vectorMediiPIB[k];
    }

    console.log(vectorAmplitudiniSV);
    console.log(vectorAmplitudiniPOP);
    console.log(vectorAmplitudiniPIB);
}
//#endregion

//#region Generator culoare celula - Cerinta 6
//cea mai mare amplitudine pozitiva se afla intre medie si maxim, air cea mai mica intre medie si minim
//cu cat valoarea e mai mare fata de medie va fi mai verde, iar cu cat va fi mai mica valoarea fata de medie va fi mai rosu
function genereazaCuloare(medie, amplitudine, valoare) {
    if (valoare > medie) //coloram cu verde
    {
        let raport = (valoare - medie) / amplitudine[1] * 255;
        let inv = 255 - raport;//inv vine pe pozitia rosu si este complementar cu verde
        return `rgb(${inv},${raport},0)`;
    }
    //altfel coloram cu rosu
    let raport = (medie - valoare) / amplitudine[0] * 255;
    let inv = 255 - raport;//inv vine pe pozitia verde si este complementar cu rosu
    return `rgb(${raport},${inv},0)`;                
}
//#endregion

//#region Construire tabel - Cerinta 6
function construireTabel() {

    construireArrayTabel();

    calculeazaMedii();

    tabel = document.getElementById("idTabel");
    tabel.style.visibility = "visible";

    let indexAnSelectat;
    let anSelect = document.querySelector('#anTabel').value;

    for (i = 0; i < ani.length; i++) {
        if (ani[i] == anSelect)
            indexAnSelectat = i;
    }


    let tabelBody = document.querySelector("#tableBody");
    tabelBody.innerHTML = '';

    for (i = 0; i < tari.length; i++) {
        let rand = document.createElement('tr');

        let celula = document.createElement('td');
        celula.innerText = tari[i];
        rand.append(celula);

        for (j = 0; j < indicatori.length; j++) {
            let celula = document.createElement('td');
            celula.innerText = vectorTabel[indexAnSelectat][i][j].toString();

            let culoare;
            if (j == 0) {
                culoare = genereazaCuloare(vectorMediiSV[indexAnSelectat], vectorAmplitudiniSV[indexAnSelectat], vectorTabel[indexAnSelectat][i][j]);
            }
            if (j == 1) {
                culoare = genereazaCuloare(vectorMediiPOP[indexAnSelectat], vectorAmplitudiniPOP[indexAnSelectat], vectorTabel[indexAnSelectat][i][j]);
            }
            if (j == 2) {
                culoare = genereazaCuloare(vectorMediiPIB[indexAnSelectat], vectorAmplitudiniPIB[indexAnSelectat], vectorTabel[indexAnSelectat][i][j]);
            }
            celula.style.backgroundColor = culoare;
            rand.append(celula);
        }
        tabelBody.append(rand);
    }
}
//#endregion


async function aplicatie() {

    await dateSperantaViata();
    await datePopulatie();
    await datePib();

    //#region Preluare date - Cerinta 1
    console.log("JSON FINAL:")
    jsonTotal = jsonTotal.concat(jsonSperanta, jsonPopulatie, jsonPib)
    console.log(jsonTotal);
    //#endregion

    //#region Afisare grafic + tooltip - Cerinte 2 si 3
    populeazaSelecturi();

    let btnGrafic = document.querySelector('#btnGrafic');
    btnGrafic.addEventListener('click', () => {
        deseneazaGrafic();

        selectIndicator.addEventListener('change', deseneazaGrafic);
        selectTara.addEventListener('change', deseneazaGrafic);
    })

    let btnStergeGrafic = document.querySelector('#btnStergeGrafic');
    btnStergeGrafic.addEventListener('click', () => {
        svg = document.getElementById("idSvg");
        svg.style.display = "none";
    })
    //#endregion

    //#region Afisare Bubble Chart - Cerinte 4 + 5
    //Cerinta 3: preiau din select anul si indicatorul si afisez toate tarile in bubble chart
    populeazaSelecturiBubble();

    let btnBubble = document.querySelector('#btnBubble');
    btnBubble.addEventListener('click', () => {

        //canvas = document.getElementById("popChart");
        //canvas.style.display = "block";

        preiaSelectAn();
        console.log(indexAnSelectat);

        deseneazaBubbleChart(indexAnSelectat);



        selectAnBubble.addEventListener('change', () => {
            //const context = canvas.getContext('2d');
            //context.clearRect(0, 0, canvas.width, canvas.height);
            preiaSelectAn();
            deseneazaBubbleChart(indexAnSelectat);
        });
    })

    let btnStergeBubble = document.querySelector('#btnStergeBubble');
    btnStergeBubble.addEventListener('click', () => {
        div = document.getElementById("idDiv");
        div.style.display = "none";
    })


    let btnBubbleAnimatie = document.querySelector('#btnBubbleAnimatie');
    btnBubbleAnimatie.addEventListener('click', () => {
        oprire = setInterval(animatie, 1000);
    })
    //#endregion

    //#region Construire tabel - Cerinta 6
    populeazaSelecturiTabel();

    let btnTabel = document.querySelector('#btnTabel');
    btnTabel.addEventListener('click', () => {

        construireTabel();
        selectAnTabel.addEventListener('change', () => {
            construireTabel();
        });
    });
    
    let btnStergeTabel = document.querySelector('#btnStergeTabel');
    btnStergeTabel.addEventListener('click', () => {
        tabel = document.getElementById("idTabel");
        tabel.style.visibility = "hidden";
        });
    //#endregion
}

document.addEventListener('DOMContentLoaded', aplicatie);