przyciskiStart();
var aktywnePrzyciski="";


//input 
function wpisz(id){
	if (id=='pole1'){
		document.getElementById('pole1').className = "eq1";
		document.getElementById('pole2').className = "eq";
	} else {
		document.getElementById('pole2').className = "eq1";
		document.getElementById('pole1').className = "eq";
	}
}

//przyciski
function przycisk(id){
	if (document.getElementById('pole1').className.match("eq1")) var pole="pole1";
	else var pole="pole2";	
	//zapisuję wartość klikniętego przycisku w zmiennej txt
	var txt=document.getElementById(id).value; 
	if (txt=='back'){	
		usun(pole);
		} else {		
			document.getElementById(pole).value += txt; //dodanie wartości przycisku do pola
			if (txt==')' || txt=='(') nawias(txt,pole);			
			document.getElementById(id).disabled = true;
			}
}

function nawias(txt,pole){
	var str=document.getElementById(pole).value;	
	if (str.length==1) odblokujCyfry();
	zamiana();
	//cyfry
	if (txt==')'){
		cofnijLewy();		
	}
	if (txt=='(' && str.length>1){
		cofnijPrawy();		
	}
}

function usun(pole){
	var pom=document.getElementById(pole).value; //cały zapis z pole do pom
	var ostatniZnak=pom[pom.length-1]; //znak do usunięcia
	pom=pom.slice(0, -1); //nowe pom bez ostatniego znaku
	document.getElementById(pole).value = pom;
	if (ostatniZnak==')'){
		zamiana();
		cofnijPrawy();		
	} else if (ostatniZnak=='(' && pom.length!=0){
		zamiana();	
		cofnijLewy();
	} else if (ostatniZnak=='(' && pom.length==0){
		//zamiana();
		przyciskiStart();
	} else cofanie(ostatniZnak); //przycisk staje się z powrotem aktywny
	
	
}

function cofanie(znak){
	for(let i=0;i<=8;i++){
		if (document.getElementById(i).value==znak) document.getElementById(i).disabled = false;
	}
}

function cofnijLewy(){
	aktywnePrzyciski="";
	for(let i=0;i<=8;i++) {
		if (document.getElementById(i).disabled == false){
			aktywnePrzyciski += i.toString();
			document.getElementById(i).disabled = true;
			}
	}
}

function cofnijPrawy(){
	for(let i=0;i<=aktywnePrzyciski.length;i++) {
		var id=parseInt(aktywnePrzyciski[i], 10);
		document.getElementById(id).disabled = false;
		}
}

function przyciskiStart(){
	for(let i=0;i<=10;i++) {
		document.getElementById(i).disabled = true;
	}
	document.getElementById(9).disabled = false;
}

function odblokujCyfry(){
	for(let i=0;i<=8;i++) {
		document.getElementById(i).disabled = false;
	}
}

function zamiana(){
	if (document.getElementById(9).disabled == false) {
		document.getElementById(9).disabled = true;
		document.getElementById(10).disabled = false;
	} else {
		document.getElementById(9).disabled = false;
		document.getElementById(10).disabled = true;
	}
}


//obliczenia
function toArray(str){
	n=str.length;
	var tab=[];

	tab[0]=0;
	for(let i=0;i<n;i++)
	{
		i++;
		pom=parseInt(str[i], 10);
		pom2=parseInt(str[i], 10);
		while(str[i+1]!=")")
		{
			var znak=parseInt(str[i+1], 10);
			tab[pom]=znak;
			pom=znak;
			i++
		}
		tab[pom]=pom2;
		i++;
	}
	
	m = findMax(tab);
	for(let i=0;i<m;i++)
	{
		if (tab[i]==undefined) tab[i]=i;
	}
	
	return tab;

}

function cykliczna(tab){
	var txt="";
	for(let i=1;i<tab.length;i++){
		if (sprawdz(tab[i],txt)){
			var first=i;
			var pom=tab[i];
			if (first != pom){
				txt+="(";
				txt+=i.toString();
				while (tab[pom]!=first){
					
					txt+=pom;
					pom=tab[pom];
				}
				txt+=pom;
				txt+=")";
			 }
        }
	} return txt;
}

function sprawdz(x,str){
    for (let i=0;i<str.length;i++) {
        if (str[i]==x) return false;
    } return true;
}

function findMax(tab)
{
    var max=tab[0];
    for(obj in tab)
    {
        if(obj>max) max=obj;
    } return max;
}


function iloczyn(x,y){
	var result=[];
	result[0]=0;
	for(let i=1;i<=x.length;i++){
		pom=y[i];
		result[i]=x[pom];
	}
	return result;
}

function potega(x){
	var result=[];
	result=iloczyn(x,x);
	return result;
}

function odwrotnosc(x){
	var result=[];
	result[0]=0;
	for(let i=1;i<x.length;i++){
		pom=x[i];
		result[pom]=i;
	}	
	return result;
}

function wybierzDzialanie(id) { //iloczyn-potęga-odwrotność
	if (id==13) {
		document.getElementById(id).className = "choosen";
		document.getElementById(14).className = "option";
		document.getElementById(15).className = "option";
		// odblokowuję pole1 i pole2
		document.getElementById('pole1').disabled = false;
		document.getElementById('pole2').disabled = false;
		}
		else if (id==14) {			
		document.getElementById(13).className = "option";
		document.getElementById(id).className = "choosen";
		document.getElementById(15).className = "option";
		// odblokowuję pole1 blokuję pole2
		document.getElementById('pole1').disabled = false;
		document.getElementById('pole2').disabled = true;
		}
		else {				
			document.getElementById(13).className = "option";
			document.getElementById(14).className = "option";
			document.getElementById(id).className = "choosen";
			// odblokowuję pole1 blokuję pole2
			document.getElementById('pole1').disabled = false;
			document.getElementById('pole2').disabled = true;
		}
				
	}

function wyswietlWynik(pom){
	pom=pom.join([separator = '']);
	var result=cykliczna(pom);	
	document.getElementById("wynik").innerHTML=result;
}

function oblicz(){
	var whichOperation;
	if (document.getElementById(13).className.match("choosen")) whichOperation = 1;
	else if (document.getElementById(14).className.match("choosen")) whichOperation = 2;
	else whichOperation = 3;
	
	var per1=document.getElementById("pole1").value;
	var per2=document.getElementById("pole2").value;
		
	
	if (per1[per1.length-1].toString()==')'){
		
		//zmieniam zapis permutacji
		var x=toArray(per1);
		
		
		var pom=[];
		//które działanie program ma wykonać
		switch(whichOperation){
			case 1:  if (per2[per2.length-1].toString()==')'){
						var y=toArray(per2);
						pom=iloczyn(x,y);
						wyswietlWynik(pom);
					 } else document.getElementById("wynik").innerHTML="Błędne dane";
					 break;
			case 2:  pom=potega(x);
					 wyswietlWynik(pom);
					 break;
			case 3:  pom=odwrotnosc(x);
					 wyswietlWynik(pom);
					 break;		
					 
		}

	} else document.getElementById("wynik").innerHTML="Błędne dane";
		
}


