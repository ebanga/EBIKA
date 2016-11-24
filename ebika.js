/*
* @author: Jean-Jacques Ebanga ,
* email  : ebanga@hotmail.com
*/

/*
*  - TJSM veut dire ThreeJS Module. Toutes les classes avec le suffixe TJSM indiquent les modules Ebika essentiellement destinés à Three.js.
*/



const      x = 0, y  = 1, z = 2, t = 3,
           r = 0, g  = 1, b = 2, a = 3,
           start= 0, end = 1,
           downRight  = 0,
           upRight    = 1,
           upLeft     = 2,
           downLeft   = 3,
           activate   = 1,
           unactivate = 0,
           ORIENT_FWD                    =  0, // En avant
           ORIENT_BWD                    =  1, // en arriere
           ORIENT_LFT                    =  2, // à  gauche
           ORIENT_RGT                    =  3, // à droite
           ORIENT_UP                     =  4, // En haut
           ORIENT_DWN                    =  5, // En bas

           DIRECTION_FWRD                =  1, // En avant
           DIRECTION_BWRD                = -1, // En Arriere
           DIRECTION_BOTH                =  2, // Les deux
           ITERATION_ENDLESS             =  8, // Les deux

           ENV_STO                       =  0, // environnement stochastique
           ENV_DET                       =  1, // environnement déterminististe

           DOWNRIGHT                     =  0, // Coin Inférieur droit d'un rectangle
           UPRIGHT                       =  1, // Coin supérieur droit d'un rectangle
           UPLEFT                        =  2, // Coin supérieur gauche d'un rectangle
           DOWNLEFT                      =  3, // Coin inférieur gauche d'un rectangle

           ALIGN_PERS                    =  0, // Alignement personnalisé
           ALIGN_LEFT                    =  1, // Alignement à gauche
           ALIGN_CENTER                  =  2, // Alignement au centre
           ALIGN_RIGHT                   =  3, // Alignement à droite
           INF_REPEAT                    = -1,

           PLANEXY                       = 0 , //Le plan XY
           PLANEXZ                       = 1 , //Le plan XZ
           PLANEYZ                       = 2 ; //Le plan YZ

/******* CONTENEUR DE CLASSES Ebika  *******/
var Ebk                                = {};

Ebk.VERSION               =  "1.0.1";
Ebk.colors_mx             =  ["red","yellow", "green", "blue", "indigo" ,"violet", "purple","orange", "magenta", "cyan", "pink", "brown", "white", "gray", "black"];
Ebk.colors_cyan_orange_mx =  ["orange", "yellow","brown"];
Ebk.frame_count           =  0;
Ebk.DOWN                  =  0;
Ebk.UP                    =  1;
Ebk.execfunc              = function (funct,params){
                             funct(params);
                            };


/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* FONCTIONS UTILITAIRES *******/
Ebk.Utilities                          = function() {

};

Ebk.Utilities.prototype                = Object.create(Object.prototype);
Ebk.Utilities.prototype.constructor    = Ebk.Utilities;



//constantes Globales
Ebk.Utilities.prototype.ORIENT_FWD                       =  0; // En avant
Ebk.Utilities.prototype.ORIENT_BWD                       =  1; // en arriere
Ebk.Utilities.prototype.ORIENT_LFT                       =  2; // à  gauche
Ebk.Utilities.prototype.ORIENT_RGT                       =  3; // à droite
Ebk.Utilities.prototype.ORIENT_UP                        =  4; // En haut
Ebk.Utilities.prototype.ORIENT_DWN                       =  5; // En bas

Ebk.Utilities.prototype.DIRECTION_FWRD                =  1; // En avant
Ebk.Utilities.prototype.DIRECTION_BWRD                = -1; // En Arriere
Ebk.Utilities.prototype.DIRECTION_BOTH                =  2; // Les deux
Ebk.Utilities.prototype.ITERATION_ENDLESS             =  8; // Les deux

Ebk.Utilities.prototype.X                             =  0; // la coordonnée x dans un tableau
Ebk.Utilities.prototype.Y                             =  1; // la coordonnée y dans un tableau
Ebk.Utilities.prototype.Z                             =  2; // la coordonnée z dans un tableau
Ebk.Utilities.prototype.T                             =  3; // la coordonnée t dans un tableau
Ebk.Utilities.prototype.R                             =  0; // la coordonnée colorimétrique A dans un tableau
Ebk.Utilities.prototype.G                             =  1; // la coordonnée colorimétrique B dans un tableau
Ebk.Utilities.prototype.B                             =  2; // la coordonnée colorimétrique C dans un tableau
Ebk.Utilities.prototype.A                             =  3; // la coordonnée colorimétrique A dans un tableau

Ebk.Utilities.prototype.ENV_STO                       =  0; // environnement stochastique
Ebk.Utilities.prototype.ENV_DET                       =  1; // environnement déterminististe

Ebk.Utilities.prototype.DOWNRIGHT                     =  0; // Coin Inférieur droit d'un rectangle
Ebk.Utilities.prototype.UPRIGHT                       =  1; // Coin supérieur droit d'un rectangle
Ebk.Utilities.prototype.UPLEFT                        =  2; // Coin supérieur gauche d'un rectangle
Ebk.Utilities.prototype.DOWNLEFT                      =  3; // Coin inférieur gauche d'un rectangle

//from Jack Moore
Ebk.Utilities.prototype.round                                        = function (value, decimals) {

    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

};

//Détermine la distance entre 2 points
Ebk.Utilities.prototype.distance                                     = function(A,B) {

    var result = Math.sqrt( Math.pow((B.x-A.x), 2)+ Math.pow((B.y-A.y), 2) + Math.pow((B.z-A.z), 2));
    return  result;

};

//Détermine le centre d'un ensemble de points
Ebk.Utilities.prototype.center                                       = function(points) {

   var  center_values 	    = {},
        is4Dim              = (points[0].length ==4)? true : false,
        somme_x             = 0,
        somme_y             = 0,
        somme_z             = 0,
        somme_t             = 0;
    if (points.length ==1) {
        center_values = points;
    }
    else if (points.length > 1) {
        for(var point = 0;point <points.length;point++) {
            somme_x            = somme_x + points[point][this.X];
            somme_y            = somme_y + points[point][this.Y];
            somme_z            = somme_z + points[point][this.Z];
            if (is4Dim ) {
                 somme_t       = somme_t + points[point][this.T];
            }
        }
        center_values          = {x:somme_x/points.length,y:somme_y/points.length,z:somme_z/points.length};
        if (is4Dim)
            center_values      = {x:somme_x/points.length,y:somme_y/points.length,z:somme_z/points.length,t:somme_t/points.length};

    }

    return center_values;

};

//Détermine le centre d'un ensemble de points en renvoyant un tableau
Ebk.Utilities.prototype.centerArr                                    = function(points) {


    var  center_values 	    ,
        is4Dim              = (points[0].length ==4)? true : false,
        somme_x             = 0,
        somme_y             = 0,
        somme_z             = 0,
        somme_t             = 0;

    if (points.length ==1) {
        center_values = points;
    }
    else if (points.length > 1) {
        for(var point = 0;point <points.length;point++) {
            somme_x            = somme_x + points[point][this.X];
            somme_y            = somme_y + points[point][this.Y];
            somme_z            = somme_z + points[point][this.Z];
            if (is4Dim ) {
                somme_t       = somme_t + points[point][this.T];
            }
        }
        center_values          = [somme_x/points.length,somme_y/points.length,somme_z/points.length];
        if (is4Dim)
            center_values      = [somme_x/points.length,somme_y/points.length,somme_z/points.length,somme_t/points.length];

    }

    return center_values;

};

//Indique si une valeur appartient à un tablea unidimensionnel
Ebk.Utilities.prototype.inArray                                      = function(element, mx) {

    var isInArray = false,
        eltIndex = 0;

    while (!(isInArray) && (eltIndex < mx.length)) {
        if (element == mx[eltIndex]) {
            isInArray = true;
        }
        eltIndex++;
    };

    return isInArray;

};

//Détermine le nombre de groupe de k éléments parmi et n>k;
Ebk.Utilities.prototype.countGroupOfKfromN                           = function(n,k) {

    var divisibility, groupsOfKcount,totalGroupsCount,remainEltsCount;
     if ((n>=k)&&(k!=0)){
        if ((n % k)==0){
            divisibility       = true;
            groupsOfKcount     = n/k;
            totalGroupsCount   = groupsOfKcount;
            remainEltsCount    = 0;
        }
        else {
            divisibility       = false;
            groupsOfKcount     = Math.floor(n/k);
            totalGroupsCount   = groupsOfKcount +1;
            remainEltsCount    = n % k;

        }
    }
    else {
        divisibility       = true;
        groupsOfKcount     = 1;
        totalGroupsCount   = groupsOfKcount;
        remainEltsCount    = 0;
    };

    return {
            divisibility      : divisibility,
            groupsOfKcount    : groupsOfKcount,
            totalGroupsCount  : totalGroupsCount,
            remainEltsCount   : remainEltsCount
      }

};

//Renvoie les sous matrices  des groupes de k éléments parmi et n. Depend de la function this.countGroupOfKfromN;
Ebk.Utilities.prototype.subMxsOfcountGroupOfKfromN                   = function(n,k) {

    var params       = this.countGroupOfKfromN(n,k),
        groupIndex  ,
        startIndex  ,
        endIndex    ,
        mxOut        = new Array(params.totalGroupsCount);

    if ((k>1)&&(k<n)){
        groupIndex  = 0;
        startIndex   = 0;
        endIndex     = startIndex+k-1;
        while (groupIndex < params.totalGroupsCount) {
            mxOut[groupIndex]  = [startIndex,endIndex];
            startIndex         = endIndex + 1;
            endIndex           = startIndex + k-1;
            groupIndex++;
            if ((!params.divisibility)&&(groupIndex==params.totalGroupsCount-1)){
                endIndex       = startIndex+params.remainEltsCount-1;
            }
        }
    }
    else {
        startIndex         = 0;
        endIndex           = n-1;
        mxOut[0]           = [startIndex,endIndex];
    };

    return mxOut;

}

// Renvoie une matrice unidimensionnelle contenant ses indices associés
Ebk.Utilities.prototype.mxIntIndex                                   = function(mxLength) {

    var mx;
    if ( mxLength > 1) {
        mx = new Array(mxLength);
        for (var mxIndex =0;mxIndex<mxLength; mxIndex++){
            mx[mxIndex]  = mxIndex;
        }
    }
    else  {
        mx = [0];
    }

    return  mx;

};

// Renvoie une matrice unidimensionnelle contenant des entiers consécutifs entre une borne de départ et celle de fin
Ebk.Utilities.prototype.mxIntBounds                                  = function(start,end) {

    var mx, distance;

    distance = Math.abs(start-end)+1;
    if (start !=end) {
        mx = new Array(distance);
        for (var mxIndex =0;mxIndex<mx.length; mxIndex++) {
            if (start<end) {
                mx[mxIndex] = start + mxIndex;
            }
            else{
                mx[mxIndex] = start - mxIndex;
            }
        }
    }
    else {
        mx = [start];
    }

    return  mx;

};

//Détermine un entier aléatoire dans un intervalle d'entier
Ebk.Utilities.prototype.intRandom                                    = function(min, max)  {

    var result;
    var valMax,valMin;
    if (min<=max) {
        valMin = min;
        valMax = max;
    }
    else if  (min>max) {
        valMin = max;
        valMax = min;
    }
    result=Math.round(Math.random() * (valMax - valMin) + new Number(valMin));

    return result;

};

//Détermine un réal aléatoire dans un intervalle de réels
Ebk.Utilities.prototype.floatRandom                                  = function(min, max)  {

    var result;
    var valMax,valMin;
    if (min<=max) {
        valMin = min;
        valMax = max;
    }
    else if  (min>max) {
        valMin = max;
        valMax = min;
    }
    result=Math.random() * (valMax - valMin) + new Number(valMin);
    return result;

};

//Renvoie un réel aléatoire dans un intervalle de réel données et le pourcentage de plage à extraire
Ebk.Utilities.prototype.pourcentFloatRandom                          = function(min, max, pourcentStart, pourcentEnd)  {

    var result, delta, level,pourcent;
    var valMax,valMin;
    if (min<=max) {
        valMin =    min;
        valMax =	max;
    }
    else if  (min>max) {
        valMin =    max;
        valMax =	min;
    }
    pourcent   =   this.floatRandom(pourcentStart, pourcentEnd);
    delta      =   Math.abs(valMax-valMin);
    if (min<=max) result     =   valMin + delta*pourcent;
    else  result             =   valMax - delta*pourcent;

    return result;

};

// renvoie une matrice permutée aléatoirement
Ebk.Utilities.prototype.randomMx                                     = function(mx)  {

    var mxOut,mxOutIndex,randomIndex;
    mxOutIndex = 0;
    mxOut = new Array(mx.length);
    while(mx.length>1) {
        randomIndex       = this.intRandom(0, mx.length-1);
        mxOut[mxOutIndex] = mx[randomIndex];
        mx.splice(randomIndex, 1);
        mxOutIndex++;
    };
    mxOut[mxOutIndex] = mx[0];

    return mxOut;
};

// renvoie une matrice d'entiers aléatoire  entre 0 et une taille donnée
Ebk.Utilities.prototype.randomMxLength                               = function(Length)  {

    var mx,mxOut;
    mx      = this.mxIntIndex(Length);
    mxOut   = this.randomMx(mx);
    return mxOut;

 }

// renvoie une matrice  de n entiers permutés aléatoirement par groupe ou rangée de k.
Ebk.Utilities.prototype.randomRangeMx                                = function(paramsIn)  {

    var mxOut           =[],
        paramCountGroups   ,
        rangeSeqMx         ,rangeSeqIndex,
        boundsMx           ,randMx       ,
        paramOp         ={};
    paramOp.length = 13;paramOp.rangeSize = 5; paramOp.mode = this.ENV_DET; paramOp.notInIdexesMx = [];
    if (paramsIn !==undefined) {
        if ('length'                  in paramsIn)     paramOp.length         = paramsIn.length;   //==n
        if ('rangeSize'               in paramsIn)     paramOp.rangeSize      = paramsIn.rangeSize;// ==k
        if ('mode'                    in paramsIn)     paramOp.mode           = paramsIn.mode;// les groupes ou rangées sont-ils séquentiels ou aléatoirs
        if ('notInIdexesMx'           in paramsIn)     paramOp.notInIdexesMx  = paramsIn.notInIdexesMx;// mx d'index qui resteront régulier.
    };
    paramCountGroups = this.subMxsOfcountGroupOfKfromN(paramOp.length,paramOp.rangeSize);
    if (paramOp.mode == this.ENV_STO) {
        rangeSeqMx   = this.randomMxLength(paramCountGroups.length);
    }
    else if (paramOp.mode == this.ENV_DET) {
        rangeSeqMx   = this.mxIntIndex(paramCountGroups.length);
    }
    for(var rangeIndex =0;rangeIndex<paramCountGroups.length;rangeIndex++) {
        rangeSeqIndex =   rangeSeqMx[rangeIndex];
        boundsMx      =   this.mxIntBounds(paramCountGroups[rangeSeqIndex][0],paramCountGroups[rangeSeqIndex][1]);
        if ((this.inArray(rangeSeqIndex,paramOp.notInIdexesMx))){
            randMx    = boundsMx;
        }
        else {
            randMx    = this.randomMx(boundsMx);
        }
        mxOut = mxOut.concat(randMx);
    }

    return mxOut;

}



// EN CONSTRUCTION   Détermine une couleur aléatoire dans un intervalle de couleurs
Ebk.Utilities.prototype.colorRandom                                  = function()  {

    return '#'+Math.floor(Math.random()*16777215).toString(16);

};

//Détermine l'orientation d'un vecteur dans un plan
Ebk.Utilities.prototype.vectorOrientation                            = function(start, end) {

    var coteOpp, coteAdj, tgAngle,angle;
    coteOpp     =  end.y - start.y;
    coteAdj     = end.x - start.x;
    tgAngle     = coteOpp/coteAdj
    angle       = Math.atan(tgAngle);
    if ((end.y==start.y)&&(end.x>start.x)) {
        angle   = 0;
    }
    else if ((end.y>start.y)&&(end.x==start.x)) {
        angle   = Math.PI/2;
    }
    else if ((end.y==start.y)&&(end.x<start.x)) {
        angle   =  Math.PI;
    }
    else if ((end.y<start.y)&&(end.x==start.x)) {
        angle   =  3*Math.PI/2;
    }
    else if ((end.y>start.y)&&(end.x>start.x)) {
        angle   = angle;
    }
    else  if ((end.y>start.y)&&(end.x<start.x)) {
        angle  += Math.PI;
    }
    else  if ((end.y<start.y)&&(end.x<start.x)) {
        angle  += Math.PI;
    }
    else  if ((end.y<=start.y)&&(end.x>=start.x)) {
        angle  += 2*Math.PI;
    }
    return angle;

};


//Détermine l'orientation ou l'angle d'un vecteur dans un plan
Ebk.Utilities.prototype.vectorAngle                                  = function(start_mx, end_mx) {

    var coteOpp, coteAdj, tgAngle,angle;
    coteOpp     =  end_mx[1] - start_mx[1];
    coteAdj     =  end_mx[0] - start_mx[0];
    tgAngle     = coteOpp/coteAdj
    angle       = Math.atan(tgAngle);
    if ((end_mx[1]==start_mx[1])&&(end_mx[0]>start_mx[0])) {
        angle   = 0;
    }
    else if ((end_mx[1]>start_mx[1])&&(end_mx[0]==start_mx[0])) {
        angle   = Math.PI/2;
    }
    else if ((end_mx[1]==start_mx[1])&&(end_mx[0]<start_mx[0])) {
        angle   =  Math.PI;
    }
    else if ((end_mx[1]<start_mx[1])&&(end_mx[0]==start_mx[0])) {
        angle   =  3*Math.PI/2;
    }
    else if ((end_mx[1]>start_mx[1])&&(end_mx[0]>start_mx[0])) {
        angle   = angle;
    }
    else  if ((end_mx[1]>start_mx[1])&&(end_mx[0]<start_mx[0])) {
        angle  += Math.PI;
    }
    else  if ((end_mx[1]<start_mx[1])&&(end_mx[0]<start_mx[0])) {
        angle  += Math.PI;
    }
    else  if ((end_mx[1]<=start_mx[1])&&(end_mx[0]>=start_mx[0])) {
        angle  += 2*Math.PI;
    }
    return angle;
};

// Détermine l'orientation ou l'angle d'un vecteur dans un plan (Plus récente version)
Ebk.Utilities.prototype.vectorDirection                              = function(startPoint, endPoint) {

    var vectComp,coteOpp,coteAdj,tgAngle,resultAngle,result;
    vectComp     = [endPoint[0] - startPoint[0], endPoint[1] - startPoint[1]];
    coteAdj      =  Math.abs(vectComp[0]);
    coteOpp      =  Math.abs(vectComp[1]);
    tgAngle      =  coteOpp/coteAdj;

    angle        =  Math.atan(tgAngle);
    if ((startPoint[0]== endPoint[0])&&(startPoint[1]== endPoint[1])) {
        result = {angleRad:0,angleDeg:0};
    } else {
        if ((vectComp[0] > 0) && (vectComp[1] > 0)) {
            resultAngle = angle;
        } //cad 2
        else if ((vectComp[0] < 0) && (vectComp[1] > 0)) {
            resultAngle = Math.PI - angle;
        } //cad 3
        else if ((vectComp[0] < 0) && (vectComp[1] < 0)) {
            resultAngle = Math.PI + angle;
        } //cad 4
        else if ((vectComp[0] > 0) && (vectComp[1] < 0)) {
            resultAngle = 2 * Math.PI - angle;
        }
        else if ((vectComp[0] > 0) && (vectComp[1] == 0)) {
            resultAngle = 0;
        }
        else if ((vectComp[0] == 0) && (vectComp[1] > 0)) {
            resultAngle = Math.PI / 2;
        }
        else if ((vectComp[0] < 0) && (vectComp[1] == 0)) {
            resultAngle = Math.PI;
        }
        else if ((vectComp[0] == 0) && (vectComp[1] < 0)) {
            resultAngle = 3 * Math.PI / 2;
        }
        result =  {angleRad:resultAngle,angleDeg:resultAngle * (180 / Math.PI)}
    }
    return result;
};


Ebk.Utilities.prototype.orientation3Vertex                          = function(vtxPivot,vtxA,vtxB) {
    var v1                   =  Ebk.MatVectUtils.prototype.vect(vtxPivot, vtxA);
    var v2                   =  Ebk.MatVectUtils.prototype.vect(vtxPivot, vtxB);

    var rest                 =  Ebk.MatVectUtils.prototype.determinantR2(v1,v2);
    ;
    var antiClockwise        = (rest>0)    ? true:false;
    var angleBetween         = {angleRad: 0,angleDeg:0,antiClockwise: antiClockwise};
    return angleBetween;

};

//Renvoie la valeur de la colonne d'une matrice bidimensionnelle sachant le nombre de colonnes de celle-ci et son indice dans sa représentation unidimensionnelle
Ebk.Utilities.prototype.column                                       = function(linearStep, column_count) {

    var result  = linearStep % column_count;
    return  result;

};

//Renvoie la valeur de la ligne d'une matrice bidimensionnelle sachant le nombre de colonnes de celle-ci,sa colonne et
// indice dans sa représentation unidimensionnelle
Ebk.Utilities.prototype.row                                          = function(linearStep, column_count, col) {

    var result  = (linearStep - col)/column_count;
    return  result;

};

// Renvoie simultanément la colonne et la ligne des deux précédentes fonctions
Ebk.Utilities.prototype.rowColumn                                    = function(linearStep, column_count) {

    var col     =  this.column(linearStep, column_count);
    var row     =  this.row(linearStep, column_count, col);
    var result  = {row: row,column:col};
    return  result;

};

// Renvoie l'indice unidimensionnelle de la représentation d'une matrice bidimensionnelle
Ebk.Utilities.prototype.linearStep                                   = function(column_count, row, column) {

    var result  =  column_count*row+column;
    return  result;

};

// Renvoie l'indice unidimensionnelle de la représentation d'une matrice tridimensionnelle
Ebk.Utilities.prototype.linearStep3D                                 = function(row_count,column_count, row, column,depth) {

    var result  =  this.linearStep (column_count, row, column) + depth*row_count*column_count;
    return  result;

};

// Renvoie les indices tridimensionnels(ligne,colonne, profondeur) en fonction de l'indice d'une matrice unidimensionnelle
Ebk.Utilities.prototype.rowColumnDepth                               = function(linearStep, row_count,column_count) {

    var rowcol      =   this.rowColumn(linearStep, column_count);
    var row         =  rowcol.row % row_count;
    var depth       = Math.floor(linearStep/(row_count*column_count));
    var result      = {row: row,col:rowcol.column,depth:depth};
    return  result;

};

// Construit la matrice des sections à partir d'une séquence d'étapes consécutives à plusieurs dimensions.
// On peut avoir une séquence points, de couleurs, de température etc.
// Ex sequence_mx = [[1,3,4],[6,9,7],[14,-12,10],[2,4,-1]], sections_mx = [[1,6,14,2],[3,9,-12,4],[4,7,10,-1]]
// on appelera étape de séquence, les sous matrices de sequence_mx et variation, les sous matrices de sections_mx
Ebk.Utilities.prototype.buildSections_mx                             = function(sequences_mx){

    var sections_count      = sequences_mx[0].length;
    var sections_mx         = new Array(sections_count);
    var sequences_count     = sequences_mx.length;
    for (var sectionIndex = 0;sectionIndex<sections_count  ;sectionIndex++){
        sections_mx[sectionIndex] = new Array(sequences_count);
        for (var  sequencesIndex =0; sequencesIndex<sequences_count; sequencesIndex++){
            sections_mx[sectionIndex][sequencesIndex] = sequences_mx[sequencesIndex][sectionIndex];
        }
     }
     return sections_mx;

};

// insert une distance dans un intervalle quelconque de plusieurs section
Ebk.Utilities.prototype.insertDistInIntvl                            = function(intervals,distance,intervalStartIndex) {

    var  isSegmentCreated, indexInterval,keepIndex, remainingDistance, intervalSize, bInf, bSup, segment;
    isSegmentCreated   =  false;
    indexInterval      =  intervalStartIndex;
    remainingDistance  =  distance;
    keepIndex          =  -1;
    while ((indexInterval<=intervals.length-1 )&&(!isSegmentCreated)) {
        bInf             = intervals[indexInterval-1];
        bSup             = intervals[indexInterval];
        intervalSize     = Math.abs(bSup-bInf);
        keepIndex        = indexInterval;
        if (remainingDistance>intervalSize) {
            remainingDistance  = Math.abs(remainingDistance-intervalSize);
        }
        else {
            isSegmentCreated = true;
             if (bInf< bSup) {
                segment =  bInf + remainingDistance;
                intervals.splice(indexInterval, 0, segment);
            }
            else if (bInf>bSup) {
                segment =  bInf - remainingDistance;
                intervals.splice(indexInterval, 0, segment);
            }

        };
        indexInterval++;
    };

    return  {intervals:intervals,new_value:segment, index:keepIndex };

};

// insert des distances successives et continue dans un intervalle quelconque de plusieurs section
Ebk.Utilities.prototype.insertContDistsInIntvl                       = function(intervals,distances) {

    var intervalStartIndex, distIndex,intervalsIn,resFunc, intervals_ini, segments_mx,segmentIndex;
    intervals_ini  =  intervals.slice();
    segments_mx    = new Array(distances.length);
   // segments_mx[0] = intervals[0];
    segmentIndex   = 0;
    if (distances.length > 1){
        intervalStartIndex   = 1;
        intervalsIn          = intervals;
        for (distIndex=0;distIndex<distances.length;distIndex++){
            resFunc = this.insertDistInIntvl(intervalsIn,distances[distIndex],intervalStartIndex);
            if (resFunc.index != -1){
                intervalStartIndex             = resFunc.index+1;
                intervalsIn                    = resFunc.intervals;
                segments_mx[segmentIndex]      = resFunc.new_value;
                segmentIndex++;
            }
        }
    }
    else {
        resFunc                        = this.insertDistInIntvl(intervals,distances[0],1);
        intervalsIn                    = resFunc.intervals;
        segments_mx[segmentIndex]      = resFunc.new_value;
    }

    return {intervals_ini:intervals_ini, intervals_modified:intervalsIn, segments:segments_mx};

}
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* FONCTIONS UTILITAIRES MATRICES ET DES VECTEURS *******/
Ebk.MatVectUtils                                                     = function() {

    Ebk.Utilities.call(this)

};
Ebk.MatVectUtils.prototype                = Object.create(Ebk.Utilities.prototype);
Ebk.MatVectUtils.prototype.constructor    = Ebk.MatVectUtils;



//Détermine un vecteur à partir de deux vecteurs donnés
Ebk.MatVectUtils.prototype.vect                                      = function(starVertex,endVertex) {

   // var result = [endVertex[0]-starVertex[0],endVertex[1]-starVertex[1],endVertex[2]-starVertex[2]];
  //  return  result;
    var result = [];
    for(var indDim =0; indDim< starVertex.length;indDim++) {
        result.push(endVertex[indDim]-starVertex[indDim]);
    };
    return  result;
};

//Détermine la somme de deux vecteurs Rb
Ebk.MatVectUtils.prototype.vectThreeDSum                             = function(v1,v2) {
    //var result = [v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2]];
    //return  result;

    var result = [];
    for(var indDim =0; indDim< v1.length;indDim++) {
        result.push(v1[indDim]+v2[indDim]);
    };
    return  result;
};

//Détermine la somme de deux vecteurs Rn
Ebk.MatVectUtils.prototype.vectThreeDSubstract                       = function(v1,v2) {

    //var result = [v1[0]-v2[0],v1[1]-v2[1],v1[2]-v2[2]];
   // return  result;
    var result = [];
    for(var indDim =0; indDim< v1.length;indDim++) {
        result.push(v1[indDim]-v2[indDim]);
    };
    return  result;
};

//Détermine le produit par un scalaire
Ebk.MatVectUtils.prototype.vectThreeDScaProd                         = function(k,v) {

    var result = [];
    for(var indDim =0; indDim< v.length;indDim++) {
        result.push(k*v[indDim]);
    }
    //var result = [k*v[0],k*v[1],k*v[2]];
    return  result;

};

//Détermine la distance entre 2 points
Ebk.MatVectUtils.prototype.dist                                      = function(v1,v2) {


    var result = 0;
    for(var indDim =0; indDim< v1.length;indDim++) {
        sum += Math.sqrt( Math.pow(v2[indDim]-v1[indDim], 2));
    }

    return result;

    //if (v.length ==3) {
    //    var result = Math.sqrt( Math.pow(v2[0]-v1[0], 2)+ Math.pow(v2[1]-v1[1], 2) + Math.pow(v2[2]-v1[2], 2));
    //} else if (v.length ==2) {
    //    var result = Math.sqrt( Math.pow(v2[0]-v1[0], 2)+ Math.pow(v2[1]-v1[1], 2) );
    //}
    //
    //return  result;

};

//Détermine la norme d'un vecteur
Ebk.MatVectUtils.prototype.norm                                      = function(v) {
    if (v.length ==3) {
        var result = Math.sqrt( Math.pow(v[0], 2)+ Math.pow(v[1], 2) + Math.pow(v[2], 2));
    } else if (v.length ==2) {
        var result = Math.sqrt( Math.pow(v[0], 2)+ Math.pow(v[1], 2) );
    }
    return  result;
};

//Détermine la norme d'un vecteur
Ebk.MatVectUtils.prototype.normalized                                = function(v) {

    var result, itsNorm = this.norm(v);
    result = [v[0]/itsNorm,v[1]/itsNorm,v[2]/itsNorm];
    return  result;

};

// renvoie le produit vectoriel entre deux vecteurs
Ebk.MatVectUtils.prototype.crossProduct                              = function(v1,v2) {

    var A, B, C, result;
    // La composante Z est perpendiculaire à la composante en X et en Y. On construit le produit vectoriel
    A =  v1[1]*v2[2]-v2[1]*v1[2];
    B =  v1[0]*v2[2]-v2[0]*v1[2];
    C =  v1[0]*v2[1]-v2[0]*v1[1];

    if( B!=0)  result = [A,-B,C];
    else       result = [A, B,C];

    return [A,-B,C];

}

// renvoie le produit scalaire entre deux vecteurs
Ebk.MatVectUtils.prototype.dotProduct                                = function(v1,v2) {

    var  result, A, B, C = 0;

    A =  v1[0]*v2[0]

    B =  v1[1]*v2[1];
    if (v1.length > 2)
        C =  v1[2]*v2[2];

    result = A+B+C;

    return result;

}

// renvoie le produit scalaire entre deux vecteurs
Ebk.MatVectUtils.prototype.determinantR2                            = function(v1,v2) {

     return v1[0]*v2[1] - v1[1]*v2[0];



}


// renvoie le vecteur correspondant à la surperposition(multiplication) d'un scalaire à un vecteur
Ebk.MatVectUtils.prototype.scalarOn3DVector                          = function(scal,vOrigine,vDirection) {

    var vector      = this.vectThreeDSubstract(vDirection,vOrigine).slice(),
        vNormalised = this.normalized(vector).slice(),
        endVector   = this.vectThreeDScaProd(scal,vNormalised).slice(),
        endPoint    = this.vectThreeDSum(vOrigine,endVector).slice();

    return [endVector,endPoint];

}


// renvoie la matrice de vecteurs correspondant à la surperposition(multiplication) d'une matrice de scalaires à un vecteur
Ebk.MatVectUtils.prototype.scalarsMxOn3DVector                       = function(scal_mx,vOrigine,vDirection) {

    var result;
    if (scal_mx.length == 1) {
        result = [this.scalarOn3DVector(scal_mx[0],vOrigine,vDirection).slice()];
    }
    else if (scal_mx.length > 1) {
        result = new Array(scal_mx.length);
        for(var scalIndex=0;scalIndex<scal_mx.length;scalIndex++) {
            result [scalIndex] = this.scalarOn3DVector(scal_mx[scalIndex],vOrigine,vDirection).slice()
        }

    }

    return result;

}


// renvoie la représentation d'un point lorsque ses coordonnées sont les coefficients d'une base vectorielles donnée.
Ebk.MatVectUtils.prototype.pointOn3Dbase                             = function(point,vOrigin,vXDir,vYDir,vZDir) {

    var xComp, yComp ,ZComp ,xyComp,finalComp, finalPoint;
        xComp      =  this.scalarOn3DVector(point[0],vOrigin,vXDir).slice();
        yComp      =  this.scalarOn3DVector(point[1],vOrigin,vYDir).slice();
        ZComp      =  this.scalarOn3DVector(point[2],vOrigin,vZDir).slice();
        xyComp     =  this.vectThreeDSum(xComp[0],yComp[0]).slice();
        finalComp  =  this.vectThreeDSum(xyComp,ZComp[0]).slice();
        finalPoint =  this.vectThreeDSum(vOrigin,finalComp).slice();
    return finalPoint;

}

// renvoie la représentation des points lorsque leurs coordonnées sont les coefficients d'une base vectorielles donnée.
Ebk.MatVectUtils.prototype.pointsOn3Dbase                            = function(points,vOrigin,vXDir,vYDir,vZDir) {

    var  result = new Array(points.length);
    if (points.length == 1){
        result[0] = this.pointOn3Dbase(points[0],vOrigin,vXDir,vYDir,vZDir).slice();
    }
    else if (points.length > 1) {

        for(var pointIndex=0; pointIndex<points.length;pointIndex++) {
            result[pointIndex]   = this.pointOn3Dbase(points[pointIndex],vOrigin,vXDir,vYDir,vZDir).slice();
        }

    }

    return  result;

}

// transpose les coéficient d'une matrice donnée des lignes en colonne et vise versa
Ebk.MatVectUtils.prototype.matrixTranspose                            = function(mx_in) {

    var mx_out = this.buildSections_mx(mx_in)
    return mx_out

}
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* MANIPULATION DES ROTATION  *******/
Ebk.RotationsUtils                                                   = function(params) {

    Ebk.MatVectUtils.call(this);


}

//--- déclaration de prototype ----
Ebk.RotationsUtils.prototype                                             = Object.create(Ebk.MatVectUtils.prototype);
Ebk.RotationsUtils.prototype.constructor                                 = Ebk.RotationsUtils;

Ebk.RotationsUtils.prototype.rutRotationOnX                          = function(pivot,point,angle) {

    var xComp,yComp,zComp,result;
    yComp =  (point[1]-pivot[1]) * Math.cos( angle)  -  (point[2]-pivot[2])*Math.sin(angle);
    zComp =  (point[1]-pivot[1]) * Math.sin(angle)  +  (point[2]-pivot[2])*Math.cos(angle);
    xComp =  point[0];
    result = [xComp , yComp+pivot[1] , zComp+pivot[2]];
    return result;

}

Ebk.RotationsUtils.prototype.rutRotationOnY                          = function(pivot,point,angle) {

    var xComp,yComp,zComp,result;
    zComp =  (point[2]-pivot[2]) * Math.cos(angle)  -  (point[0]-pivot[0])*Math.sin(angle);
    xComp =  (point[2]-pivot[2]) * Math.sin(angle)  +  (point[0]-pivot[0])*Math.cos(angle);
    yComp =   point[1];
    result = [xComp+pivot[0] , yComp , zComp+pivot[2]];
    return result;

}

Ebk.RotationsUtils.prototype.rutRotationOnZ                          = function(pivot,point,angle) {

  var xComp,yComp,zComp,result;
    xComp =   (point[0]-pivot[0]) * Math.cos(angle)  -  (point[1]-pivot[1])*Math.sin(angle);
    yComp =   (point[0]-pivot[0]) * Math.sin(angle)  +  (point[1]-pivot[1])*Math.cos(angle);
    zComp =    point[2];
    result = [xComp+pivot[0] , yComp +pivot[1], zComp];

  return result;
}

Ebk.RotationsUtils.prototype.rutRotationOnXYZ                        = function(pivot,point,angle_mx) {

    var xResult,yResult, zResult;
    xResult = this.rutRotationOnX(pivot,point,angle_mx[0]).slice();
    yResult = this.rutRotationOnY(pivot,xResult,angle_mx[1]).slice();
    zResult = this.rutRotationOnZ(pivot,yResult,angle_mx[2]).slice();

    return  zResult;
}


/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* GÉNÈRE UNE BASE ORTHONORMÉE  À PARTIR D'UN VECTEUR ARBITRAIRE DONNÉ   *******/
Ebk.ArbitraryFrameCoord                                              = function(params) {

    Ebk.RotationsUtils.call(this);

    if (params !==undefined) {
        this.afcOrigin            = ('afcOrigin'              in params) ? params.afcOrigin:[0,0,0];
        this.afcDirection         = ('afcDirection'           in params) ? params.afcDirection:[1,3,2];
    }
    else {
        //définir les valeurs par défaut pour tests
        this.afcOrigin            = [0,0,0];
        this.afcDirection         = [1,3,2];
    }

}


//--- déclaration de prototype ----
Ebk.ArbitraryFrameCoord.prototype                                             = Object.create(Ebk.RotationsUtils.prototype);
Ebk.ArbitraryFrameCoord.prototype.constructor                                 = Ebk.ArbitraryFrameCoord;


Ebk.ArbitraryFrameCoord.prototype.afcAssign                                    = function(params){

    if (params !==undefined) {
        if ('afcOrigin'          in params)   this.afcOrigin         =  params.afcOrigin ;
        if ('afcDirection'       in params)   this.afcDirection      =  params.afcDirection;
    }

}


//Initialisation des données opérationnelles
Ebk.ArbitraryFrameCoord.prototype.afcIni_operational_data            = function() {
    // this.afcVector2 est l'axe des Y
    this.afcVector2  = [this.afcDirection[0]-this.afcOrigin[0],this.afcDirection[1]-this.afcOrigin[1],this.afcDirection[2]-this.afcOrigin[2]];

}


//genère l'axe des X
Ebk.ArbitraryFrameCoord.prototype.afcGeneratedVector1                = function() {

   if ((this.afcVector2[0]==0)&&(this.afcVector2[1]==0)&&(this.afcVector2[2]!=0)){
        this.afcVector1  =[this.afcVector2[2],0,0];
    }
    else {
        this.afcVector1  =[this.afcVector2[1],-this.afcVector2[0],0];
    }

}

//genère l'axe des Z
Ebk.ArbitraryFrameCoord.prototype.afcGeneratedVector3                = function() {

    this.afcVector3 = this.crossProduct(this.afcVector1,this.afcVector2);

}


Ebk.ArbitraryFrameCoord.prototype.afcNormalizeVectors                = function() {
    this.afcVectorN1 = this.normalized(this.afcVector1);
    this.afcVectorN2 = this.normalized(this.afcVector2);
    this.afcVectorN3 = this.normalized(this.afcVector3);

    this.afcPointN1  = this.vectThreeDSum( this.afcOrigin, this.afcVectorN1);
    this.afcPointN2  = this.vectThreeDSum( this.afcOrigin, this.afcVectorN2);
    this.afcPointN3  = this.vectThreeDSum( this.afcOrigin, this.afcVectorN3);
}


//générer la matrice
Ebk.ArbitraryFrameCoord.prototype.afc_mx_generated                   = function() {

    this.afcGeneratedVector1();
    this.afcGeneratedVector3();
    this.afcNormalizeVectors();

}

//Construction de l'ensemble
Ebk.ArbitraryFrameCoord.prototype.afcBuild                           = function(params) {

    this.afcAssign(params);
    this.afcIni_operational_data();
    this.afc_mx_generated();

};


// définir un point dans la nouvelle base
Ebk.ArbitraryFrameCoord.prototype.afcSetPointOnFrameCoord            = function(point) {

    var vectOnX             = this.vectThreeDScaProd(point[0],this.afcVectorN1),
        vectOnY             = this.vectThreeDScaProd(point[1],this.afcVectorN2),
        vectOnZ             = this.vectThreeDScaProd(point[2],this.afcVectorN3),
        vectXPlusY          = this.vectThreeDSum(vectOnX, vectOnY);
        this.afcEndVect     = this.vectThreeDSum(vectXPlusY,vectOnZ);
        this.afcEndPoint    = this.vectThreeDSum(this.afcOrigin,this.afcEndVect);
};


// définir plusieurs points dans la nouvelle base
Ebk.ArbitraryFrameCoord.prototype.afcSetPointsOnFrameCoord            = function(points) {

    this.afcEndPoints  = [];
    if (points.length==1) {
        this.afcSetPointOnFrameCoord(points[0]);
        this.afcEndPoints.push( this.afcEndPoint.slice());
    }
    else {
        for(var pointIndex=0;pointIndex< points.length;pointIndex++) {
            this.afcSetPointOnFrameCoord(points[pointIndex]);
            this.afcEndPoints.push(this.afcEndPoint.slice());
        }
    }


};

// construire une boite
Ebk.ArbitraryFrameCoord.prototype.afcBox                             = function(depthStart,depthEnd, backWidth,backHeight,frontWidth,frontHeight) {
   /*
      tout est construit à partir de l'origine
      la gauche est en -x, la droite en x,
      l'arriere  -y, l'avant y,
      le haut z, le bas -z

   */

  var  ptBackDownLeft0  = [-backWidth/2,depthStart,-backHeight/2], ptBackDownRight0 = [backWidth/2,depthStart,-backHeight/2],
       ptBackUpRight0   = [backWidth/2,depthStart, backHeight/2],  ptBackUpleft0    = [-backWidth/2,depthStart, backHeight/2],
      ptFrontDownLeft0  = [-frontWidth/2,depthEnd,-frontHeight/2],  ptFrontDownRight0  = [ frontWidth/2,depthEnd,-frontHeight/2],
      ptFrontUpRight0   = [ frontWidth/2,depthEnd, frontHeight/2],  ptFrontUpleft0     = [-frontWidth/2,depthEnd, frontHeight/2];

     // on converti vers le vecteur arbitraire
     this.afcSetPointsOnFrameCoord ([ptBackDownLeft0,ptBackDownRight0,ptBackUpRight0,ptBackUpleft0,
                                     ptFrontDownLeft0,ptFrontDownRight0,ptFrontUpRight0,ptFrontUpleft0 ]);
    var ptBackDownLeft  = this.afcEndPoints[0], ptBackDownRight = this.afcEndPoints[1],
        ptBackUpRight   = this.afcEndPoints[2],  ptBackUpleft   = this.afcEndPoints[3],


        ptFrontDownLeft  = this.afcEndPoints[4],  ptFrontDownRight  = this.afcEndPoints[5],
        ptFrontUpRight   = this.afcEndPoints[6],  ptFrontUpleft     = this.afcEndPoints[7];

    var  backFace  = [ptBackDownLeft,ptBackDownRight, ptBackUpRight,ptBackUpleft],frontFace   = [ptFrontDownRight,ptFrontDownLeft, ptFrontUpleft,ptFrontUpRight],
     leftFace  = [ptFrontDownLeft, ptBackDownLeft, ptBackUpleft,ptFrontUpleft],     rightFace = [ ptBackDownRight, ptFrontDownRight , ptFrontUpRight, ptBackUpRight],

     downFace  = [ptBackDownRight, ptBackDownLeft, ptFrontDownLeft , ptFrontDownRight ], upFace    = [ ptBackUpleft  , ptBackUpRight  ,ptFrontUpRight  ,ptFrontUpleft];


    return [backFace ,frontFace  ,leftFace   ,rightFace,downFace,upFace  ];

};


/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* DILATATION D'UN COMPOSANT *******/
Ebk.Dilatation                                                       = {};

Ebk.Dilatation.Component                                             = function(params) {

    Ebk.ArbitraryFrameCoord.call(this);

    if (params !==undefined) {
        this.dilCompStart         = ('dilCompStart'       in params) ? params.dilCompStart:5;
        this.dilCompEnd           = ('dilCompEnd'         in params) ? params.dilCompEnd:8;
        this.dilCompFactor        = ('dilCompFactor'      in params) ? params.dilCompFactor:0.5;
    }
    else {
        //définir les valeurs par défaut pour tests
        this.dilCompStart        = 5;
        this.dilCompEnd          = 8;
        this.dilCompFactor       = 0.5;
    }

};

Ebk.Dilatation.Component.prototype                                   = Object.create(Ebk.ArbitraryFrameCoord.prototype);
Ebk.Dilatation.Component.prototype.constructor                       = Ebk.Dilatation.Component;



//Permet d'assigner toutes les propriété, individuellement ou collectivement
Ebk.Dilatation.Component.prototype.dilCompAssign                     = function (params) {

    if (params !==undefined) {
       if ('dilCompStart' in params)   this.dilCompStart  = params.dilCompStart;
       if ('dilCompEnd'   in params)   this.dilCompEnd    =  params.dilCompEnd;
       if ('dilCompFactor' in params)  this.dilCompFactor =  params.dilCompFactor;
    }

};

//Génération des matrix
Ebk.Dilatation.Component.prototype.dilComp_mx_generated              = function() {

    var distanceBound = Math.abs(this.dilCompEnd - this.dilCompStart),
        dilSize       = this.dilCompFactor*distanceBound;

    if ( this.dilCompStart<this.dilCompEnd ) {
        this.dilComValue = this.dilCompEnd + dilSize;
    }
    else if ( this.dilCompStart>this.dilCompEnd ){
        this.dilComValue = this.dilCompEnd - dilSize;
    }
    else  this.dilComValue = this.dilCompStart;

};

//Construction de l'ensemble
Ebk.Dilatation.Component.prototype.dilCompBuild                      = function(params) {

    this.dilCompAssign(params);
    this.dilComp_mx_generated();

};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/** DILATATION D'UN VECTEUR **/
Ebk.Dilatation.Vector                                                = function(params) {

    Ebk.Dilatation.Component.call(this);

    if (params !==undefined) {
        this.dilVectStart_mx         = ('dilVectStart_mx'       in params) ? params.dilVectStart_mx.slice():[0,0,0];
        this.dilVectEnd_mx           = ('dilVectEnd_mx'         in params) ? params.dilVectEnd_mx.slice():[3,5,8];
        this.dilVectFactor_mx        = ('dilVectFactor_mx'      in params) ? params.dilVectFactor_mx.slice():[0.5,0.5,0.5];
    }
    else {
        //définir les valeurs par défaut pour tests
        this.dilVectStart_mx        = [0,0,0];
        this.dilVectEnd_mx          = [3,5,8];
        this.dilVectFactor_mx       = [0.5,0.5,0.5];
    }

};

Ebk.Dilatation.Vector.prototype                                   = Object.create(Ebk.Dilatation.Component.prototype);
Ebk.Dilatation.Vector.prototype.constructor                       = Ebk.Dilatation.Vector;



//Permet d'assigner toutes les propriété, individuellement ou collectivement
Ebk.Dilatation.Vector.prototype.dilVectAssign                        = function (params) {

    if (params !==undefined) {
            if ('dilVectStart_mx' in params)   this.dilVectStart_mx  =  params.dilVectStart_mx.slice();
            if ('dilVectEnd_mx'   in params)   this.dilVectEnd_mx    =  params.dilVectEnd_mx.slice();
            if ('dilVectFactor_mx' in params)  this.dilVectFactor_mx =  params.dilVectFactor_mx.slice();
    }
};

    //Génération des matrix
Ebk.Dilatation.Vector.prototype.dilVect_mx_generated                 = function() {

    this.dilVectValue_mx = new Array(this.dilVectStart_mx.length);

    if (this.dilVectStart_mx.length == 1) {
        this.dilCompBuild({dilCompStart:this.dilVectStart_mx[0],
                           dilCompEnd:this.dilVectEnd_mx[0],
                           dilCompFactor:this.dilVectFactor_mx[0]}
                         );
        this.dilVectValue_mx[0] = this.dilComValue;
    }
    else if (this.dilVectStart_mx.length > 1) {

        for(var compIndex =0;compIndex<this.dilVectStart_mx.length;compIndex++){
            this.dilCompBuild({dilCompStart:this.dilVectStart_mx[compIndex],
                               dilCompEnd:this.dilVectEnd_mx[compIndex],
                               dilCompFactor:this.dilVectFactor_mx[compIndex]}
            );
            this.dilVectValue_mx[compIndex] = this.dilComValue;
        }

    }

};

//Construction de l'ensemble
Ebk.Dilatation.Vector.prototype.dilVectBuild                         = function(params) {

    this.dilVectAssign(params);
    this.dilVect_mx_generated();

};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/** DILATATION DE PLUSIEURS VECTEURS **/


Ebk.Dilatation.Vectors                                               = function(params) {

    Ebk.Dilatation.Vector.call(this);
    var size   = 50,
        factor = -0.1;
    if (params !==undefined) {
        this.dilVectsPivot_mx         = ('dilVectsPivot_mx'        in params) ? params.dilVectsPivot_mx.slice():[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
        this.dilVectsEnd_mx           = ('dilVectsEnd_mx'          in params)  ? params.dilVectsEnd_mx.slice():[[size,-size,size],[size,size,size],[-size,size,size],[-size,-size,size]];
        this.dilVectsFactor_mx        = ('dilVectsFactor_mx'       in params)  ? params.dilVectsFactor_mx.slice():[[factor,factor,factor],[factor,factor,factor],[factor,factor,factor],[factor,factor,factor]];
    }
    else {
        //définir les valeurs par défaut pour tests
        this.dilVectsPivot_mx        = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
        this.dilVectsEnd_mx          = [[size,-size,size],[size,size,size],[-size,size,size],[-size,-size,size]];
        this.dilVectsFactor_mx       = [[factor,factor,factor],[factor,factor,factor],[factor,factor,factor],[factor,factor,factor]];
    }

};

Ebk.Dilatation.Vectors.prototype                                     = Object.create(Ebk.Dilatation.Vector.prototype);
Ebk.Dilatation.Vectors.prototype.constructor                         = Ebk.Dilatation.Vectors;



//Permet d'assigner toutes les propriété, individuellement ou collectivement
Ebk.Dilatation.Vectors.prototype.dilVectsAssign                      = function (params) {

    if (params !==undefined) {
        if ('dilVectsPivot_mx' in params)    this.dilVectsPivot_mx    =  params.dilVectsPivot_mx.slice();
        if ('dilVectsEnd_mx'   in params)    this.dilVectsEnd_mx      =  params.dilVectsEnd_mx.slice();
        if ('dilVectsFactor_mx' in params)   this.dilVectsFactor_mx   =  params.dilVectsFactor_mx.slice();
    }

};


//Génération des matrix
Ebk.Dilatation.Vectors.prototype.dilVects_mx_generated               = function() {

    var vectPivot, vectFactor;
    this.dilVectsValue_mx = new Array(this.dilVectsEnd_mx.length);
    if (this.dilVectsEnd_mx.length == 1) {
        this.dilVectBuild({dilVectStart_mx   :this.dilVectsPivot_mx[0],
                             dilVectEnd_mx   :this.dilVectsEnd_mx[0],
                             dilVectFactor_mx:this.dilVectsFactor_mx[0]
        });
        this.dilVectsValue_mx[0] = this.dilVectValue_mx.slice();
    }
    else if (this.dilVectsEnd_mx.length > 1) {

        for(var vectorIndex=0;vectorIndex<this.dilVectsValue_mx.length;vectorIndex++){

            if (this.dilVectsPivot_mx.length == this.dilVectsEnd_mx.length)
                 vectPivot = this.dilVectsPivot_mx[vectorIndex]
            else
                 vectPivot = this.dilVectsPivot_mx[0];


            if (this.dilVectsFactor_mx.length == this.dilVectsEnd_mx.length)
                vectFactor = this.dilVectsFactor_mx[vectorIndex]
            else
                vectFactor = this.dilVectsFactor_mx[0];

            this.dilVectBuild({dilVectStart_mx   :vectPivot,
                                 dilVectEnd_mx   :this.dilVectsEnd_mx[vectorIndex],
                                 dilVectFactor_mx:vectFactor
            });
            this.dilVectsValue_mx[vectorIndex] = this.dilVectValue_mx.slice();

        }
    }

};

//Construction de l'ensemble
Ebk.Dilatation.Vectors.prototype.dilVectsBuild                       = function(params) {

    this.dilVectsAssign(params);
    this.dilVects_mx_generated();

};


/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* TRAITEMENT BASIC DES CONVERSIONS PROPORTIONNELLES D'UN SCALAIRE DANS UN INTERVALLE  *******/
Ebk.IntervalRatioBasic                                               = function (params) {

    Ebk.Dilatation.Vectors.call(this)
    if (params !==undefined) {
        this.irbMin        = ('irbMin'in params) ? params.irbMin:4;
        this.irbMax        = ('irbMax'in params) ? params.irbMax:30;
        this.irbPosition   = ('irbPosition'in params) ? params.irbPosition:18;
    }
    else  {
        this.irbMin      = 4;
        this.irbMax      = 30;
        this.irbPosition = 18;
    }

}

Ebk.IntervalRatioBasic.prototype                = Object.create(Ebk.Dilatation.Vectors.prototype);
Ebk.IntervalRatioBasic.prototype.constructor    = Ebk.IntervalRatioBasic;



Ebk.IntervalRatioBasic.prototype.irbAssignStandard                 = function (params) {

    if (params !==undefined) {
        if ('irbMin' in params)   this.irbMin                   =  params.irbMin;
        if ('irbMax' in params)   this.irbMax                   =  params.irbMax;
        if ('irbPosition in params')   this.irbPosition         =  params.irbPosition;
    }

};

Ebk.IntervalRatioBasic.prototype.irbAssignCenterWidth                = function (params) {

    //L'assignation du centre entraine obligatoirement celle de l'étandus (Width)
    if (params !==undefined) {
            if ('irbCenter' in params)   {
                this.irbCenter        =  params.irbCenter;
                if ('irbWidth' in params)   {
                    this.irbWidth  =  params.irbWidth;
                    this.irbMax    =  this.irbCenter + this.irbWidth;
                    this.irbMin    =  this.irbCenter - this.irbWidth;
                }
            };

        }

};

Ebk.IntervalRatioBasic.prototype.irbAssign                           = function (params) {

    this.irbAssignStandard(params);
    this.irbAssignCenterWidth(params);

};

//Initialisation des données opérationnelles
Ebk.IntervalRatioBasic.prototype.irbIni_operational_data             = function() {

   this.irbDeltaMax       = this.irbMax      -  this.irbMin;
   this.irbDeltaPosition  = this.irbPosition -  this.irbMin;
   this.irbRatio          = this.irbDeltaPosition/this.irbDeltaMax;

}

//générer la matrice
Ebk.IntervalRatioBasic.prototype.irb_mx_generated                    = function() {

    this.irbIni_operational_data();

}

//Construction de l'ensemble
Ebk.IntervalRatioBasic.prototype.irbBuild                            = function(params) {

    this.irbAssign(params);
    this.irbIni_operational_data();
    this.irb_mx_generated();

};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* COLLECTION DE TRAITEMENT BASIC DES CONVERSIONS PROPORTIONNELLES D'UN SCALAIRE DANS UN INTERVALLE *******/
Ebk.IntervalRatioColl                                                = function (params) {

    Ebk.IntervalRatioBasic.call(this)
    if (params !==undefined) {
        this.ircIntervalsBorders_mx        = ('ircIntervalsBorders_mx'in params) ? params.ircIntervalsBorders_mx:[[-30,30],[0,40],[27,50]];
        this.ircPositions_mx               = ('ircPostions_mx'in params) ? params.ircPositions_mx :[15,3,33];
        this.ircPourcentIntervals_mx       = ('ircPourcentIntervals_mx 'in params) ? params.ircPourcentIntervals_mx  :[[0.2,0.5],[0.6,0.9],[0.3,0.4]];

    }
    else  {

        this.ircIntervalsBorders_mx        = [[-30,30],[0,40],[27,50]];
        this.ircPositions_mx               = [-15,3,33];
        this.ircPourcentIntervals_mx       = [[0.2,0.5],[0.6,0.9],[0.3,0.4]];
     }

}

Ebk.IntervalRatioColl.prototype                = Object.create(Ebk.IntervalRatioBasic.prototype);
Ebk.IntervalRatioColl.prototype.constructor    = Ebk.IntervalRatioColl;


Ebk.IntervalRatioColl.prototype.ircAssignStandard                    = function (params) {

    if (params !==undefined) {
        if ('ircIntervalsBorders_mx' in params)   this.ircIntervalsBorders_mx              =  params.ircIntervalsBorders_mx;
        if ('ircPositions_mx' in params)           this.ircPositions_mx                    =  params.ircPositions_mx;
        if ('ircPourcentIntervals_mx' in params)  this.ircPourcentIntervals_mx             =  params.ircPourcentIntervals_mx;
    }

};

Ebk.IntervalRatioColl.prototype.irbAssignCentersWidths               = function (params) {

    //L'assignation des centres entraine obligatoirement celle des étandus Widths
        if (params !==undefined) {
            if ('ircCenters' in params)   {
                this.ircCenters        =  params.ircCenters;
                if ('ircWidths' in params)   {
                    this.ircWidths     =  params.ircWidths;
                    if (this.ircPositions_mx.length == 1) {
                        this.ircIntervalsBorders_mx = [this.ircCenters[0]-this.ircWidths[0],this.ircCenters[0]+this.ircWidths[0]];

                    }
                    else if (this.ircPositions_mx.length > 1){
                        this.ircIntervalsBorders_mx = new Array(this.ircPositions_mx.length);
                        var i; //intervalIndex aide à mieux interpréter le code, tant dis que i favorise sa lecture.
                        for (var intervalIndex = 0;intervalIndex<this.ircPositions_mx.length;intervalIndex++) {
                            i = intervalIndex;
                            this.ircIntervalsBorders_mx[intervalIndex] = [this.ircCenters[i]-this.ircWidths[i],this.ircCenters[i]+this.ircWidths[i]];
                        }

                    }
               }
            }

        }

};

Ebk.IntervalRatioColl.prototype.ircAssign                            = function (params) {

    this.ircAssignStandard(params);
    this.irbAssignCentersWidths(params);

};

//Initialisation des données opérationnelles
Ebk.IntervalRatioColl.prototype.ircIni_operational_data              = function() {

    this.ircRatio_mx  = new Array(this.ircPositions_mx.length);

};

//Construction de l'ensemble
Ebk.IntervalRatioColl.prototype.ircGenerateRatioPosition             = function(ratio,min,max) {
    var delta = max-min, pos = min+ratio*delta
        return  pos ;
};


//Construction de l'ensemble
Ebk.IntervalRatioColl.prototype.ircGenerateRadomPositions            = function() {

    var xPourcent = this.floatRandom(this.ircPourcentIntervals_mx[0][0],this.ircPourcentIntervals_mx[0][1]);
    var yPourcent = this.floatRandom(this.ircPourcentIntervals_mx[1][0],this.ircPourcentIntervals_mx[1][1]);
    var zPourcent = this.floatRandom(this.ircPourcentIntervals_mx[2][0],this.ircPourcentIntervals_mx[2][1]);
    var xRandom,yRandom,zRandom;
    xRandom = this.ircGenerateRatioPosition(xPourcent, this.ircIntervalsBorders_mx[0][0],this.ircIntervalsBorders_mx[0][1]);
    yRandom = this.ircGenerateRatioPosition(yPourcent, this.ircIntervalsBorders_mx[1][0],this.ircIntervalsBorders_mx[1][1]);
    zRandom = this.ircGenerateRatioPosition(zPourcent, this.ircIntervalsBorders_mx[2][0],this.ircIntervalsBorders_mx[2][1]);
    this.ircIntervalRandomRatio = [xRandom,yRandom,zRandom];




};

//générer la matrice
Ebk.IntervalRatioColl.prototype.irc_mx_generated                     = function() {

    var i;
    this.ircIni_operational_data();

    if (this.ircPositions_mx.length == 1) {
        this.irbBuild({irbPosition:this.ircPositions_mx[0], irbMin: this.ircIntervalsBorders_mx[0][0],irbMax: this.ircIntervalsBorders_mx[0][1]});
        this.ircRatio_mx[0] = this.irbRatio;
    }
    else if (this.ircPositions_mx.length > 1){
         for (var intervalIndex = 0;intervalIndex<this.ircPositions_mx.length;intervalIndex++) {
             i = intervalIndex;
             this.irbBuild({irbPosition:this.ircPositions_mx[i], irbMin: this.ircIntervalsBorders_mx[i][0],irbMax: this.ircIntervalsBorders_mx[i][1]});
             this.ircRatio_mx[i] = this.irbRatio;
        }
    }

   // this.ircGenerateRadomPositions();
};

//Construction de l'ensemble
Ebk.IntervalRatioColl.prototype.ircBuild                            = function(params) {

    this.ircAssign(params);
    this.ircIni_operational_data();
    this.irc_mx_generated();

};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* DÉTERMINATION DES COORDONÉES D'UN MAPPING UV *******/
Ebk.UVMap_TJSM                                                       = function (params) {

    Ebk.IntervalRatioColl.call(this)
    if (params !==undefined) {
        this.uvmReferencePlane_mx        = ('uvmReferencePlane_mx'in params) ? params.uvmReferencePlane_mx:[[-30,30],[-50,50]];
        this.uvmVertices_mx              = ('uvmVertices_mx'in params) ? params.uvmVertices_mx :[[-20,-30,0],[30,-30,0],[30,30,0],[-20,30,0]];
        this.uvmMappingPlane             = ('uvmMappingPlane'in params) ? params.uvmMappingPlane: PLANEXY;
    }
    else  {
        this.uvmReferencePlane_mx        = [[-30,30],[-50,50]];
        this.uvmVertices_mx              = [[-20,-30,0],[30,-30,0],[30,30,0],[-20,30,0]];
        this.uvmMappingPlane             =  PLANEXY;
    }

}

Ebk.UVMap_TJSM .prototype                = Object.create(Ebk.IntervalRatioColl.prototype);
Ebk.UVMap_TJSM .prototype.constructor    = Ebk.UVMap_TJSM ;



Ebk.UVMap_TJSM .prototype.uvmAssign                                        = function (params) {

    this.uvmIsGeometryAssigned = false;
    if (params !==undefined) {
        if ('uvmReferencePlane_mx' in params)   this.uvmReferencePlane_mx               =  params.uvmReferencePlane_mx;
        if ('uvmVertices_mx' in params)         this.uvmVertices_mx                     =  params.uvmVertices_mx;
        if ('uvmMappingPlane' in params)        this.uvmMappingPlane                    =  params.uvmMappingPlane;
        if ('uvmGeometry' in params)            {this.uvmGeometry                       =  params.uvmGeometry; this.uvmIsGeometryAssigned = true; }
    }

};

//Initialisation des données opérationnelles
Ebk.UVMap_TJSM .prototype.uvmIni_operational_data                    = function() {
    // Je ne comprend pas pourquoi et comment j'ai fais ça à vérifier
    this.uvmUV_mx      = new Array(this.uvmVertices_mx.length);

};

//générer la matrice des UV correcpondant un vertexes fournis
Ebk.UVMap_TJSM .prototype.uvm_mx_RatioOnXYPlane                      = function() {

     for(var uvIndex = 0; uvIndex<this.uvmVertices_mx.length;uvIndex++) {
         this.ircBuild({ircIntervalsBorders_mx:this.uvmReferencePlane_mx,ircPositions_mx:[  this.uvmVertices_mx[uvIndex][x],this.uvmVertices_mx[uvIndex][y]] });
         this.uvmUV_mx[uvIndex] =  this.ircRatio_mx.slice();
     };

};


//générer la matrice des UV correcpondant un vertexes fournis
Ebk.UVMap_TJSM .prototype.uvm_mx_RatioOnXYPlaneTJSVect3               = function() {

    for(var uvIndex = 0; uvIndex<this.uvmVertices_mx.length;uvIndex++) {
        this.ircBuild({ircIntervalsBorders_mx:this.uvmReferencePlane_mx,ircPositions_mx:[  this.uvmVertices_mx[uvIndex].x,this.uvmVertices_mx[uvIndex].y] });
        this.uvmUV_mx[uvIndex] =  this.ircRatio_mx.slice();
    };

};


//générer le contenu de l'objet Geometry
Ebk.UVMap_TJSM .prototype.uvmGeometryContentXYPlaneGenerated         = function() {

   var uvs = [];
    if (this.uvmIsGeometryAssigned == true){
            for(var verticeIndex = 0; verticeIndex<this.uvmVertices_mx.length;verticeIndex++) {
                this.uvmGeometry.vertices.push( new THREE.Vector3( this.uvmVertices_mx[verticeIndex][x],this.uvmVertices_mx[verticeIndex][y], this.uvmVertices_mx[verticeIndex][z]));
                uvs.push( new THREE.Vector2( this.uvmUV_mx[verticeIndex][x], this.uvmUV_mx[verticeIndex][y]));
                if (verticeIndex >= 2) {
                    this.uvmGeometry.faces.push( new THREE.Face3( 0, verticeIndex-1, verticeIndex ) );
                    this.uvmGeometry.faceVertexUvs[0].push( [ uvs[0], uvs[verticeIndex-1], uvs[verticeIndex] ] );
                }
            }
        //this.uvmGeometry.computeBoundingSphere();
      //  this.uvmGeometry.computeBoundingBox();
      //  this.uvmGeometry.uvsNeedUpdate = true;
       // this.uvmGeometry.verticesNeedUpdate = true;
    };

};

//générer le contenu de l'objet Geometry
Ebk.UVMap_TJSM .prototype.uvmGeneratedGeometryUVOnlyForXYPlane       = function() {

    var uvs = [];
        this.uvmUVs_mx = [];
        for(var verticeIndex = 0; verticeIndex<this.uvmVertices_mx.length;verticeIndex++) {
            uvs.push( new THREE.Vector2( this.uvmUV_mx[verticeIndex][x], this.uvmUV_mx[verticeIndex][y]));
            if (verticeIndex >= 2) {

                this.uvmUVs_mx.push( [ uvs[0], uvs[verticeIndex-1], uvs[verticeIndex] ] );
            }
        }
};


//générer la matrice
Ebk.UVMap_TJSM.prototype.uvm_mx_generated                            = function() {

    this.uvmIni_operational_data();
    if (this.uvmMappingPlane ==PLANEXY){
        this.uvm_mx_RatioOnXYPlane();
        this.uvmGeometryContentXYPlaneGenerated();
    }
};

//Construction de l'ensemble
Ebk.UVMap_TJSM.prototype.uvmBuild                                   = function(params) {

    this.uvmAssign(params);
    this.uvm_mx_generated();

};


//Génère juste les coordonnées UV
Ebk.UVMap_TJSM.prototype.uvmBuildUVsOnly                            = function(params) {
    this.uvmAssign(params);

    this.uvmIni_operational_data();

    if (this.uvmMappingPlane ==PLANEXY){
        this.uvm_mx_RatioOnXYPlaneTJSVect3();
    };
    this.uvmGeneratedGeometryUVOnlyForXYPlane();

};

//met à jour contenu de l'objet Geometry
Ebk.UVMap_TJSM.prototype.uvmGeometryContentXYPlaneUpdate             = function(geometry, verticeIndex,vertex_mx) {

    var faceIndex;
    geometry.vertices[verticeIndex].x = vertex_mx[x];
    geometry.vertices[verticeIndex].y = vertex_mx[y];
    geometry.vertices[verticeIndex].z = vertex_mx[z];

    this.ircBuild( {ircIntervalsBorders_mx:this.uvmReferencePlane_mx,ircPositions_mx:[vertex_mx[x],vertex_mx[y]] });
    this.uvmUVUpdate  =  this.ircRatio_mx.slice();

    if (verticeIndex == 0) {// premier vertex
        faceIndex = 0;
        for (var vertIndex = 0; vertIndex < this.uvmVertices_mx.length; vertIndex++) {
            if (vertIndex >= 2) {
                geometry.faceVertexUvs[0][faceIndex][0].x = this.uvmUVUpdate[0];
                geometry.faceVertexUvs[0][faceIndex][0].y = this.uvmUVUpdate[1];
                faceIndex++;
            }

        }
    }
    else if (verticeIndex == 1) { // deuxième vertex

        geometry.faceVertexUvs[ 0 ][ 0 ][1].x = this.uvmUVUpdate[0];
        geometry.faceVertexUvs[ 0 ][ 0 ][1].y = this.uvmUVUpdate[1];
    }
    else if (verticeIndex == this.uvmVertices_mx.length-1) { //dernier vertex

        geometry.faceVertexUvs[ 0 ][ verticeIndex-2][2].x = this.uvmUVUpdate[0];
        geometry.faceVertexUvs[ 0 ][ verticeIndex-2][2].y = this.uvmUVUpdate[1];
    }
    else  { //dernier vertex
        faceIndex = verticeIndex-2;
        geometry.faceVertexUvs[ 0 ][ faceIndex ][2].x = this.uvmUVUpdate[0];
        geometry.faceVertexUvs[ 0 ][ faceIndex ][2].y = this.uvmUVUpdate[1];

        geometry.faceVertexUvs[ 0 ][ faceIndex+1 ][1].x = this.uvmUVUpdate[0];
        geometry.faceVertexUvs[ 0 ][ faceIndex+1 ][1].y = this.uvmUVUpdate[1];


    }
    geometry.verticesNeedUpdate = true;
    geometry.uvsNeedUpdate = true;
};

//met à jour le contenu de l'objet Geometry
Ebk.UVMap_TJSM.prototype.uvmGeometryContentXYPlaneUpdate_mx          = function(geometry, mx) {

    if (mx.length == 1 ) {
        this.uvmGeometryContentXYPlaneUpdate(geometry, 0,mx[0]);
    }
    else if (mx.length >1 ) {
        for (var verticeIndex = 0; verticeIndex < mx.length; verticeIndex++) {
            this.uvmGeometryContentXYPlaneUpdate(geometry, verticeIndex,mx[verticeIndex]);
        }
    }
}


//générer un triangle
Ebk.UVMap_TJSM .prototype.uvmTriangleGeometryGenerated         = function(geometry,object) {


             geometry.vertices.push( new THREE.Vector3( object[0][0],object[0][1], object[0][2]));
             geometry.vertices.push( new THREE.Vector3( object[1][0],object[1][1], object[1][2]));
             geometry.vertices.push( new THREE.Vector3( object[2][0],object[2][1], object[2][2]));

             geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

};

//met à jour le un vertex de l'objet Geometry
Ebk.UVMap_TJSM.prototype.uvmUpdateGeometryVertex                     = function(geometry, verticeIndex,vertex_mx) {

    geometry.vertices[verticeIndex].x = vertex_mx[x];
    geometry.vertices[verticeIndex].y = vertex_mx[y];
    geometry.vertices[verticeIndex].z = vertex_mx[z];
    geometry.verticesNeedUpdate = true;
    geometry.uvsNeedUpdate = true;

};


//met à jour le un vertex de l'objet Geometry
Ebk.UVMap_TJSM.prototype.uvmUpdateGeometryVertices                     = function(geometry,vertex_mx) {


    if (vertex_mx.length == 1 ) {
        geometry.vertices[0].x = vertex_mx[0][0];
        geometry.vertices[0].y = vertex_mx[0][1];
        geometry.vertices[0].z = vertex_mx[0][2];
    }
    else if (vertex_mx.length >1 ) {
        for (var verticeIndex = 0; verticeIndex < vertex_mx.length; verticeIndex++) {
            geometry.vertices[verticeIndex].x = vertex_mx[verticeIndex][0];
            geometry.vertices[verticeIndex].y = vertex_mx[verticeIndex][1];
            geometry.vertices[verticeIndex].z = vertex_mx[verticeIndex][2];
        }
    }
    geometry.verticesNeedUpdate = true;
    geometry.uvsNeedUpdate = true;

};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* GESTION DES VARIATIONS TRANSITOIRES*******/
Ebk.Transition                                                       = function (params) {

    Ebk.UVMap_TJSM.call(this);
    this.trstCumulativeDist  =0;
    this.trstRepeatCount     =0;

}


Ebk.Transition.prototype                                             = Object.create(Ebk.UVMap_TJSM.prototype);
Ebk.Transition.prototype.constructor                                 = Ebk.Transition;


//revoie la distance cumulative de plusieurs intervalles
Ebk.Transition.prototype.trstIntervalsCumulDist                      = function(interval_mx) {

    if (interval_mx.length == 2) {
         this.trstCumulativeDist  = Math.abs(interval_mx[1]-interval_mx[0]);
    }
    else if (interval_mx.length > 2) {

          this.trstCumulativeDist  = 0;
          for (var intervalIndex = 1 ;intervalIndex <interval_mx.length;intervalIndex++) {

              this.trstCumulativeDist += Math.abs(interval_mx[intervalIndex]-interval_mx[intervalIndex-1]);
          }
    }
    else    this.trstCumulativeDist  =0;
}


//interpoler une distance dans l'ensemble des intervalles
Ebk.Transition.prototype.trstDistanceInterpolateInInterval           = function(transition,interval_mx) {

    var  alreadyInterpoled = false, remindToInterpolate = transition, boundIndex = 1,
         minBound, maxBound,intervalSize,delta, result = interval_mx[interval_mx.legnth-1];

    while ((boundIndex < interval_mx.length)&&(!(alreadyInterpoled))) {

        minBound     =interval_mx[boundIndex-1];  maxBound=interval_mx[boundIndex];
        intervalSize = Math.abs(maxBound-minBound);
        delta        = remindToInterpolate - intervalSize;
        if (delta<=0) {
            if (minBound<maxBound){
                result = minBound + remindToInterpolate;
            }
            else if (minBound>maxBound){
                result = minBound - remindToInterpolate;
            }

            alreadyInterpoled = true;
        }
        else if (delta>0) {
            remindToInterpolate = delta;
        }

        boundIndex++;
    }


    return result;

}

//revoie une transition sur une taille donnée(interval_size)
Ebk.Transition.prototype.trstGetStep                                 = function(step_index,step_count,interval_size,tFact) {
    var result

    if (tFact !=0) {
        //séquence d'EBIKA
        result = interval_size*( (1- Math.pow((1+tFact),step_index+1))/(1- Math.pow((1+tFact),step_count+1)));
    }
    else {
        var interval_sub_size = interval_size/step_count;
        result = (step_index)*interval_sub_size;
    };

  //  if (interval_size == 0) result= 0;


    return result;
}


//revoie une  transition sur un intervalle donneé
Ebk.Transition.prototype.trstIntervalStep                            = function(step_index,step_count,interval_mx,tFact) {

    var result, distance = Math.abs(interval_mx[1]-interval_mx[0]);

    if (interval_mx[0] <interval_mx[1]) {
        result = interval_mx[0] + this.trstGetStep(step_index,step_count,distance,tFact);
    }
    else if (interval_mx[0] >interval_mx[1]) {
        result = interval_mx[0] - this.trstGetStep(step_index,step_count,distance,tFact);
    } else result = interval_mx[0];

    return result;

}


//revoie une  transition sur plusieurs intervals
Ebk.Transition.prototype.trstPartialIntervalsStep                    = function(step_index,section_step_count,intervals_mx, tFact_mx) {

   var result,tFact,interval_index,interval,current_index,step_count = section_step_count*(intervals_mx.length-1);

   if  ((step_index>=1) &&(step_index<=step_count)){

       interval_index = Math.floor((step_index-1)/section_step_count);

       current_index  = (step_index-1)%section_step_count+1;

       interval       = [intervals_mx[interval_index], intervals_mx[interval_index + 1]];

       if  (interval_index>=0 && interval_index< tFact_mx.length) {
           tFact          = tFact_mx[ interval_index];
       } else {
           tFact          = tFact_mx[0];
       }

       result         = this.trstIntervalStep( current_index, section_step_count, interval, tFact);

   }
   else if(step_index<1) {
       result =  intervals_mx[0];
   }
   else if(step_index>step_count) {
       result = intervals_mx[intervals_mx.length-1];
   }

    return result;
}


//revoie une  transition globale sur plusieurs intervals
Ebk.Transition.prototype.trstGlobalIntervalsStep                     = function(step_index,step_count,intervals_mx, tFact,triggerOnce) {

    var result,transition;
    if (triggerOnce) {

        this.trstIntervalsCumulDist(intervals_mx);
    }
    if (step_index<step_count+1) {

        transition = this.trstGetStep(step_index,step_count,this.trstCumulativeDist,tFact);

        result = this.trstDistanceInterpolateInInterval(transition ,intervals_mx);

     }
    else {result = intervals_mx[intervals_mx.length-1];}

   // console.log(result,this.trstRepeatCount ,triggerOnce,intervals_mx,this.trstCumulativeDist,step_index,step_count);

    return result;
};

//revoie une  transition  selon qu'elle est défini globale ou partielle sur plusieurs intervals
Ebk.Transition.prototype.trstSelectTypeIntervalsStep                 = function(tType,step_index,step_count,intervals_mx, tFact_Mx,isTriggerOnce,isRepeat) {

    var result,partial_step_count,step = step_index;

    if (tType ==0) {

        if (isRepeat) {
            partial_step_count = step_count * (intervals_mx.length - 1);
            step = step_index%partial_step_count;

            if (step ==0){ this.trstRepeatCount++}
            else if (step ==partial_step_count) { this.trstRepeatCount++; }
        }
        result = this.trstPartialIntervalsStep(step ,step_count,intervals_mx,tFact_Mx);
    }
    else if (tType==1) {
        if (isRepeat)  {step =  step_index%step_count;
            if (step ==0){ this.trstRepeatCount++}
        }
        result = this.trstGlobalIntervalsStep(step,step_count,intervals_mx, tFact_Mx[0],isTriggerOnce);
    }
    return result;
};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* GESTION DES VARIATIONS TRANSITOIRES EN COLLECTION*******/
Ebk.TransitionCollection                                              = function (params) {

    Ebk.Transition.call(this);

}


Ebk.TransitionCollection.prototype                                   = Object.create(Ebk.Transition.prototype);
Ebk.TransitionCollection.prototype.constructor                       = Ebk.TransitionCollection;



//détermine la disrtance cumulée totale et la distance de chaque borne de section, depuis le point de départ
Ebk.TransitionCollection.prototype.trscIniCumulativeVectorsDistance  = function() {

    this.trscCumulativeVectorsDistance = 0;
    this.trscCumulativeBoundsDistance  = [0];

    for(var intervalIndex = 1;intervalIndex<this.trscIntervalCollection_mx.length;intervalIndex++){

        this.trscCumulativeVectorsDistance += this.dist(this.trscIntervalCollection_mx[intervalIndex],this.trscIntervalCollection_mx[intervalIndex-1]);
        this.trscCumulativeBoundsDistance.push(this.trscCumulativeVectorsDistance);

    }
};

// renvoie le coefficient de transition par rapport à la distance cumulative des vecteurs
Ebk.TransitionCollection.prototype.trscTransitionFactor              = function() {

    return this.trstGetStep(this.trscStep_index,this.trscStep_count,this.trscCumulativeVectorsDistance,this.trscTFact_Mx[0]);

};

// renvoie le point transitoire
Ebk.TransitionCollection.prototype.trscGenerateTransitionVertex      = function(factor,startVertex,endVertex) {

    var vector                = this.vect(startVertex,endVertex);
    var normal                = this.normalized(vector);
    var transitionVector      = this.vectThreeDScaProd(factor,normal);

   this.trscTransitionVertex = this.vectThreeDSum(startVertex,transitionVector);


};


// Interpoler le facteur de transition dans la trajectoire pour obtenir le point transitoir
Ebk.TransitionCollection.prototype.trscInterpolateTransitionIntoPath     = function() {

     var startVertex,endVertex,isInterpolate = false,intervalIndex = 1;
     var transitionFactor = this.trscTransitionFactor(),currentTransitionFactor;
     while ((!isInterpolate)&&(intervalIndex <this.trscIntervalCollection_mx.length)) {

         if (transitionFactor <=this.trscCumulativeBoundsDistance[intervalIndex]) {

             startVertex = this.trscIntervalCollection_mx[intervalIndex-1];
             endVertex   = this.trscIntervalCollection_mx[intervalIndex];

             currentTransitionFactor =Math.abs(transitionFactor -this.trscCumulativeBoundsDistance[intervalIndex-1] );



             // console.log(startVertex, endVertex);
             this.trscGenerateTransitionVertex(currentTransitionFactor, startVertex,endVertex);

             isInterpolate = true;
         }

             intervalIndex++;
     }

    //console.log(this.trscIntervalCollection_mx,this.trscTransitionVertex);
   // console.log(this.trscTransitionVertex );
};


//détermine les intervalles de chaque items
Ebk.TransitionCollection.prototype.trscIniIntervals                   = function() {

   for(var itemIndex = 0;itemIndex<this.trscItemsCount;itemIndex++){
       this.trscItemsObj[itemIndex]        = new Ebk.Transition();
       this.trscItemsIntervals[ itemIndex] = [];
       for(var boundIndex = 0;boundIndex< this.trscItemsBoundCount;boundIndex++){
          this.trscItemsIntervals[ itemIndex].push(this.trscIntervalCollection_mx[boundIndex][itemIndex]);
       }
   }

   // console.log(this.trscIntervalCollection_mx, this.trscItemsIntervals);
};

//parcours tous les items pour extrair
Ebk.TransitionCollection.prototype.trscGetAllItems                   = function() {

    for(var itemIndex = 0;itemIndex<this.trscItemsCount;itemIndex++){

        this.trscItems_result[itemIndex] = this.trscItemsObj[itemIndex].trstSelectTypeIntervalsStep(this.trscTType,this.trscStep_index,this.trscStep_count,this.trscItemsIntervals[ itemIndex],
               this.trscTFact_Mx, this.trscIsTriggerOnce,this.trscIsRepeat);
    }

}



//revoie une  transition  selon qu'elle est défini globale ou partielle sur plusieurrs Items
Ebk.TransitionCollection.prototype.trscGetItemsStep                  = function(tType,step_index,step_count,intervalCollection_mx, tFact_Mx,isTriggerOnce,isRepeat) {

    var result;

    this.trscTType                        = tType;
    this.trscStep_index                   = step_index ;
    this.trscStep_count                   = step_count;
    this.trscIntervalCollection_mx        = intervalCollection_mx;
    this.trscTFact_Mx                     = tFact_Mx;
    this.trscIsTriggerOnce                = isTriggerOnce ;
    this.trscIsRepeat                     = isRepeat;

    if (isTriggerOnce) {
        this.trscItemsCount                   = intervalCollection_mx[0].length;
        this.trscItemsBoundCount              = intervalCollection_mx.length;
        this.trscItemsObj                     = new Array ( this.trscItemsCount );
        this.trscItemsIntervals               = new Array ( this.trscItemsCount );
        this.trscItems_result                 = new Array ( this.trscItemsCount );

        //console.log(intervalCollection_mx);

        this.trscIniIntervals();
        this.trscIniCumulativeVectorsDistance();

       // console.log(this.trscCumulativeVectorsDistance,this.trscCumulativeBoundsDistance);

    }
    if ((tType==0)||(tType==1)){
        this.trscGetAllItems();

     //  this.trscInterpolateTransitionIntoPath();
        result = this.trscItems_result.slice();
    } else if (tType==2) {


        //if (step_index <20)
        this.trscInterpolateTransitionIntoPath();
        result = this.trscTransitionVertex.slice();
    } else {
        // par défaut
        this.trscGetAllItems();

        result = this.trscItems_result.slice();
    }




    return result;
};
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* Crée une boite orienté dans la direction du veteur donnée *******/
Ebk.OrientedBasicBox                                                    = function(params) {

    Ebk.TransitionCollection.call(this);

    if (params !==undefined) {
        this.obbVector                    =  ('obbVector' in params) ? params.obbVector  : [[0,0, 0],[0,2, 0]];
        this.obbBackWidth                 =  ('obbBackWidth' in params) ? params.obbBackWidth  : 3;
        this.obbBackHeight                =  ('obbBackHeight' in params) ? params.obbBackHeight  : 2;
        this.obbFrontWidth                =  ('obbFrontWidth' in params) ? params.obbFrontWidth  : 1.6;
        this.obbFrontHeight               =  ('obbFrontHeight' in params) ? params.obbFrontHeight  : 1.8;
        this.obbDepthStart                =  ('obbDepthStart' in params) ? params.DepthStart  : 0.2;
        this.obbDepthEnd                  =  ('obbDepthEnd' in params) ? params.DepthEnd  : 2;
        this.obbShowface                  =  ('obbShowface' in params) ? params.obbShowface  : [1,1,1,1,1,1];
    }
    else {
        //définir les valeurs par défaut pour tests
        this.obbVector                    =  [[0,0, 0],[0,2, 0]];
        this.obbBackWidth                 =    3;
        this.obbBackHeight                =    2;
        this.obbFrontWidth                =   1.6;
        this.obbFrontHeight               =   1.8;
        this.obbDepthStart                =   0.2;
        this.obbDepthEnd                  =   2;
        this.obbShowface                  =   [1,1,1,1,1,1];

    }

};

Ebk.OrientedBasicBox.prototype                         = Object.create(Ebk.TransitionCollection.prototype);
Ebk.OrientedBasicBox.prototype.constructor             = Ebk.OrientedBasicBox ;

Ebk.OrientedBasicBox.prototype.obbAssign                             = function (params) {
    if (params !==undefined) {
        if ('obbVector' in params)                { this.obbVector             = params.obbVector;}
        if ('obbBackWidth' in params)             { this.obbBackWidth          = params.obbBackWidth;}
        if ('obbBackHeight' in params)            { this.obbBackHeight         = params.obbBackHeight;}
        if ('obbFrontWidth' in params)            { this.obbFrontWidth         = params.obbFrontWidth;}
        if ('obbFrontHeight' in params)           { this.obbFrontHeight        = params.obbFrontHeight;}
        if ('obbDepthStart' in params)            { this.obbDepthStart         = params.obbDepthStart;}
        if ('obbDepthEnd' in params)              { this.obbDepthEnd           = params.obbDepthEnd ;}
        if ('obbShowface' in params)              { this.obbShowface           = params.obbShowface ;}
    }
};

// initialiser les données intermediares
Ebk.OrientedBasicBox.prototype.obbIni_operational_data               = function() {
    //créer la base orthonormée à partir du vecteur donnée
    this.afcBuild({afcOrigin: this.obbVector[0], afcDirection:this.obbVector[1]});

    this.obbBackDownLeft0   = [-this.obbBackWidth/2,this.obbDepthStart,-this.obbBackHeight/2];  this.obbBackDownRight0   = [this.obbBackWidth/2,this.obbDepthStart,-this.obbBackHeight/2];
    this.obbBackUpRight0    = [this.obbBackWidth/2,this.obbDepthStart, this.obbBackHeight/2];   this.obbBackUpleft0      = [-this.obbBackWidth/2,this.obbDepthStart, this.obbBackHeight/2];
    this.obbFrontDownLeft0  = [-this.obbFrontWidth/2,this.obbDepthEnd,-this.obbFrontHeight/2];  this.obbFrontDownRight0  = [ this.obbFrontWidth/2,this.obbDepthEnd,-this.obbFrontHeight/2];
    this.obbFrontUpRight0   = [ this.obbFrontWidth/2,this.obbDepthEnd, this.obbFrontHeight/2];  this.obbFrontUpleft0     = [-this.obbFrontWidth/2,this.obbDepthEnd, this.obbFrontHeight/2];

    //Placer les points dans la nouvelle base orthonormée
    this.afcSetPointsOnFrameCoord ([ this.obbBackDownLeft0,this.obbBackDownRight0,this.obbBackUpRight0 ,this.obbBackUpleft0 ,
                                     this.obbFrontDownLeft0,this.obbFrontDownRight0, this.obbFrontUpRight0,this.obbFrontUpleft0 ]);
    this.obbBackDownLeft   = this.afcEndPoints[0]; this.obbBackDownRight = this.afcEndPoints[1];
    this.obbBackUpRight    = this.afcEndPoints[2]; this.obbBackUpleft    = this.afcEndPoints[3];
    this.obbFrontDownLeft  = this.afcEndPoints[4];  this.obbFrontDownRight  = this.afcEndPoints[5];
    this.obbFrontUpRight   = this.afcEndPoints[6];  this.obbFrontUpleft     = this.afcEndPoints[7];
};


// générer face arriere
Ebk.OrientedBasicBox.prototype.obbGenerateBack                       = function() {

    var obbBackGeom = new THREE.Geometry();
        obbBackGeom.vertices.push(new THREE.Vector3(this.obbBackDownLeft[0],this.obbBackDownLeft[1],this.obbBackDownLeft[2]),
                                   new THREE.Vector3(this.obbBackDownRight[0],this.obbBackDownRight[1],this.obbBackDownRight[2]),
                                   new THREE.Vector3(this.obbBackUpRight[0],this.obbBackUpRight[1],this.obbBackUpRight[2]),
                                   new THREE.Vector3( this.obbBackUpleft [0], this.obbBackUpleft [1],this.obbBackUpleft [2]));
        obbBackGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbBackMat  = new THREE.MeshStandardMaterial({color :"green",side:THREE.DoubleSide});

    this.obbBackMeSh = new THREE.Mesh(obbBackGeom,obbBackMat);
    obbBackGeom.computeVertexNormals();
    obbBackGeom.computeFaceNormals();
    this.obbBackMeSh.castShadow    = true;
    this.obbBackMeSh.receiveShadow = true;
    this.obbBoxContainer.add( this.obbBackMeSh);

}

// générer face avant
Ebk.OrientedBasicBox.prototype.obbGenerateFront                      = function() {

    var obbFrontGeom = new THREE.Geometry();
    obbFrontGeom.vertices.push(new THREE.Vector3(this.obbFrontDownRight[0],this.obbFrontDownRight[1],this.obbFrontDownRight[2]),
        new THREE.Vector3(this.obbFrontDownLeft[0],this.obbFrontDownLeft[1],this.obbFrontDownLeft[2]),
        new THREE.Vector3(this.obbFrontUpleft[0],this.obbFrontUpleft[1],this.obbFrontUpleft[2]),
        new THREE.Vector3( this.obbFrontUpRight [0],  this.obbFrontUpRight [1], this.obbFrontUpRight [2]));

    obbFrontGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbFrontMat  = new THREE.MeshStandardMaterial({color :"green",side:THREE.DoubleSide});

    this.obbFrontMeSh = new THREE.Mesh(obbFrontGeom,obbFrontMat);
    obbFrontGeom.computeVertexNormals();
    obbFrontGeom.computeFaceNormals();
    this.obbFrontMeSh.castShadow    = true;
    this.obbFrontMeSh.receiveShadow = true;
    this.obbBoxContainer.add(this.obbFrontMeSh);

}


// générer face gauche
Ebk.OrientedBasicBox.prototype.obbGenerateLeft                       = function() {

    var obbLeftGeom = new THREE.Geometry();
    obbLeftGeom.vertices.push(new THREE.Vector3(this.obbFrontDownLeft[0],this.obbFrontDownLeft[1],this.obbFrontDownLeft[2]),
        new THREE.Vector3(this.obbBackDownLeft[0],this.obbBackDownLeft[1],this.obbBackDownLeft[2]),
        new THREE.Vector3(this.obbBackUpleft [0],this.obbBackUpleft [1],this.obbBackUpleft[2]),
        new THREE.Vector3(this.obbFrontUpleft[0], this.obbFrontUpleft [1],this.obbFrontUpleft[2]));
    obbLeftGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbLeftMat  = new THREE.MeshStandardMaterial({color :"red",side:THREE.DoubleSide});

    this.obbLeftMeSh = new THREE.Mesh(obbLeftGeom,obbLeftMat);
    obbLeftGeom.computeVertexNormals();
    obbLeftGeom.computeFaceNormals();
    this.obbLeftMeSh.castShadow    = true;
    this.obbLeftMeSh.receiveShadow = true;
    this.obbBoxContainer.add( this.obbLeftMeSh);

}

// générer face droite
Ebk.OrientedBasicBox.prototype.obbGenerateRight                      = function() {

    var obbRightGeom = new THREE.Geometry();
    obbRightGeom.vertices.push(new THREE.Vector3(this.obbBackDownRight[0],this.obbBackDownRight[1],this.obbBackDownRight[2]),
        new THREE.Vector3(this.obbFrontDownRight[0],this.obbFrontDownRight[1],this.obbFrontDownRight[2]),
        new THREE.Vector3(this.obbFrontUpRight[0],this.obbFrontUpRight[1],this.obbFrontUpRight[2]),
        new THREE.Vector3(this.obbBackUpRight[0], this.obbBackUpRight [1],this.obbBackUpRight[2]));
    obbRightGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbRightMat  = new THREE.MeshStandardMaterial({color :"red",side:THREE.DoubleSide});

    this.obbRightMeSh = new THREE.Mesh(obbRightGeom,obbRightMat);

    obbRightGeom.computeVertexNormals();
    obbRightGeom.computeFaceNormals();
    this.obbRightMeSh.castShadow    = true;
    this.obbRightMeSh.receiveShadow = true;
    this.obbBoxContainer.add( this.obbRightMeSh);

}

// générer face de dessous
Ebk.OrientedBasicBox.prototype.obbGenerateDown                       = function() {

    var obbDownGeom = new THREE.Geometry();
    var opac = this.floatRandom(0.2,0.7);
    obbDownGeom.vertices.push(new THREE.Vector3(this.obbBackDownRight[0],this.obbBackDownRight[1],this.obbBackDownRight[2]),
        new THREE.Vector3(this.obbBackDownLeft[0],this.obbBackDownLeft[1],this.obbBackDownLeft[2]),
        new THREE.Vector3(this.obbFrontDownLeft[0],this.obbFrontDownLeft[1],this.obbFrontDownLeft[2]),
        new THREE.Vector3(this.obbFrontDownRight[0], this.obbFrontDownRight [1],this.obbFrontDownRight[2]));
    obbDownGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbDownMat  = new THREE.MeshStandardMaterial({color :"blue",side:THREE.DoubleSide,transparent:true, opacity:opac});

    this.obbDownMeSh = new THREE.Mesh(obbDownGeom,obbDownMat);

    obbDownGeom.computeVertexNormals();
    obbDownGeom.computeFaceNormals();
    this.obbDownMeSh.castShadow    = true;
    this.obbDownMeSh.receiveShadow = true;
    this.obbBoxContainer.add( this.obbDownMeSh);

}


// générer face du dessus
Ebk.OrientedBasicBox.prototype.obbGenerateUp                         = function() {

    var obbUpGeom = new THREE.Geometry();
    var opac = this.floatRandom(0.2,0.7);
    obbUpGeom.vertices.push(new THREE.Vector3(this.obbBackUpleft[0],this.obbBackUpleft[1],this.obbBackUpleft[2]),
        new THREE.Vector3(this.obbBackUpRight[0],this.obbBackUpRight[1],this.obbBackUpRight[2]),
        new THREE.Vector3(this.obbFrontUpRight[0],this.obbFrontUpRight[1],this.obbFrontUpRight[2]),
        new THREE.Vector3(this.obbFrontUpleft[0], this.obbFrontUpleft [1],this.obbFrontUpleft[2]));
    obbUpGeom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(0,2,3));
    var obbUpMat  = new THREE.MeshStandardMaterial({color :"blue",side:THREE.DoubleSide,transparent:true, opacity:opac});

    this.obbUpMeSh = new THREE.Mesh(obbUpGeom,obbUpMat);

    obbUpGeom.computeVertexNormals();
    obbUpGeom.computeFaceNormals();
    this.obbUpMeSh.castShadow    = true;
    this.obbUpMeSh.receiveShadow = true;
    this.obbBoxContainer.add( this.obbUpMeSh);



}


// générer toutes les matrices
Ebk.OrientedBasicBox.prototype.obb_mx_generated                      = function() {
    this.obbBoxContainer = new THREE.Object3D();
    if (this.obbShowface[0] ==1) this.obbGenerateBack();
    if (this.obbShowface[1] ==1)this.obbGenerateFront();
    if (this.obbShowface[2] ==1)this.obbGenerateLeft();
    if (this.obbShowface[3] ==1)this.obbGenerateRight();
    if (this.obbShowface[4] ==1)this.obbGenerateDown();
    if (this.obbShowface[5] ==1)this.obbGenerateUp();
    scene.add(this.obbBoxContainer);
}

// Construire toutes les données en création
Ebk.OrientedBasicBox.prototype.obbBuild                              = function(params){
    this.obbAssign(params);
    this.obbIni_operational_data();
    this.obb_mx_generated();
};


/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* région d'affichage ou pièce d'écran *******/
Ebk.BoxScreenPart                                                    = function(params) {

    Ebk.OrientedBasicBox.call(this);

    if (params !==undefined) {
        this.bspPointsIn                    =  ('bspPointsIn' in params) ? params.bspPointsIn  : [[-2,0, 0],[4,0, 0],[3,2, 0],[-2,3, 0]];
        this.bspMarginFactor                =  ('bspMarginFactor' in params) ? params.bspMarginFactor : -0.2;
        this.bspDepthVector                 =  ('bspDepthVector' in params) ? params.bspDepthVector : [1,1, 4];
        this.bspDisplayColor                =  ('bspDisplayColor' in params) ? params.bspDisplayColor : [90,0.6, 0.6];
        this.bspSideColorAndOpacity         =  ('bspSideColorAndOpacity' in params) ? params.bspSideColorAndOpacity : [247,0.6, 0.6,0.4];
        this.bspReferencePlane_mx           =  ('bspReferencePlane_mx' in params) ? params.bspReferencePlane_mx :[[-2,2],[0,3]];
        this.bspTransparentBoxCount         =  ('bspTransparentBoxCount' in params) ? params.bspTransparentBoxCount :2;

    }
    else {
        //définir les valeurs par défaut pour tests
        this.bspPointsIn                    =   [[-2,0, 0],[4,0, 0],[3,2, 0],[-2,3, 0]];
        this.bspMarginFactor                =   -0.2;
        this.bspDepthVector                 =   [1,1, 4];
        this.bspDisplayColor                =   [90,0.5, 0.6];
        this.bspSideColorAndOpacity         =   [90,0.6, 0.6,0.4];
        this.bspReferencePlane_mx           =   [[-2,2],[0,3]];
        this.bspTransparentBoxCount         =    2;
    }

};

Ebk.BoxScreenPart.prototype                         = Object.create(Ebk.OrientedBasicBox.prototype);
Ebk.BoxScreenPart.prototype.constructor             = Ebk.BoxScreenPart;
Ebk.BoxScreenPart.prototype.bspDisplayFacesCount    = 2;

//Permet d'assigner toutes les propriétés, individuellement ou collectivement
Ebk.BoxScreenPart.prototype.bspAssign                                = function (params) {
    if (params !==undefined) {
        if ('bspPointsIn' in params)              { this.bspPointsIn             = params.bspPointsIn ;}
        if ('bspMarginFactor' in params)          { this.bspMarginFactor         = params.bspMarginFactor ;}
        if ('bspDepthVector' in params)           { this.bspDepthVector          = params.bspDepthVector ;}
        if ('bspDisplayColor' in params)          { this.bspDisplayColor         = params.bspDisplayColor ;}
        if ('bspSideColorAndOpacity' in params)   { this.bspSideColorAndOpacity  = params.bspSideColorAndOpacity;}
        if ('bspReferencePlane_mx' in params)     { this.bspReferencePlane_mx    = params.bspReferencePlane_mx;}
        if ('bspTransparentBoxCount' in params)   { this.bspTransparentBoxCount  = params.bspTransparentBoxCount;}
    }
};

// initialiser les marges de la pièce d'affichage
Ebk.BoxScreenPart.prototype.bspIniMarginBox                          = function() {

    var ctr = this.centerArr(this.bspPointsIn).slice();
    this.dilVectsBuild({ dilVectsPivot_mx:[ctr],
        dilVectsEnd_mx:this.bspPointsIn,
        dilVectsFactor_mx:[[this.bspMarginFactor,this.bspMarginFactor,this.bspMarginFactor]] });
    this.bspPoints      = this.dilVectsValue_mx.slice();
    this.bspDepthPoints = new Array(this.bspPoints.length);
};


// fabriquer l'objet volumétrique
Ebk.BoxScreenPart.prototype.bspIniVolume                            = function() {

    var a, b,c;
    for(var pointIndex=0;pointIndex<this.bspPoints.length; pointIndex++){
        a = this.bspPoints[pointIndex][0]+this.bspDepthVector[0];
        b = this.bspPoints[pointIndex][1]+this.bspDepthVector[1];
        c = this.bspPoints[pointIndex][2]+this.bspDepthVector[2];
        this.bspDepthPoints[pointIndex] = [a,b,c];
    }
    this.bspVolumePoints = this.bspPoints.concat(this.bspDepthPoints);

    var ctr              = this.centerArr(this.bspVolumePoints).slice();

    this.dilVectsBuild({ dilVectsPivot_mx:[ctr],
        dilVectsEnd_mx: this.bspVolumePoints,
        dilVectsFactor_mx:[[-0.02,-0.02,-0.02]] });
    this.bspTransparentVolumePoints   = this.dilVectsValue_mx.slice();
};



// initialiser les données intermediares
Ebk.BoxScreenPart.prototype.bspIni_operational_data                  = function() {

    this.bspIniMarginBox();
    this.bspIniVolume();

};



// générer une instance de boite transparante
Ebk.BoxScreenPart.prototype.bsp_mx_generatedSingleTransparentBox           = function(transParentBoxIndex) {

    this.bspTransparentGeom[transParentBoxIndex] = new THREE.Geometry();
    for(var pointIndex=0;pointIndex< this.bspVolumePoints.length; pointIndex++){

        this.bspTransparentGeom[transParentBoxIndex].vertices.push(new THREE.Vector3(this.bspTransparentVolumePoints[pointIndex][0],
            this.bspTransparentVolumePoints[pointIndex][1],
            this.bspTransparentVolumePoints[pointIndex][2]))
    }


    //arriere
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(0,1,2));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(0,2,3));

    //droite
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(1,5,6));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(1,6,2));

    //avant
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(5,4,7));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(5,7,6));

    //gauche
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(4,0,3));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(4,3,7));

    //bas
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(1,0,4));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(1,4,5));

    //haut
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(3,2,6));
    this.bspTransparentGeom[transParentBoxIndex].faces.push(new THREE.Face3(3,6,7));



    var colorIn = new THREE.Color("hsl("+this.bspSideColorAndOpacity[0]+","+this.bspSideColorAndOpacity[1]+"%,"+this.bspSideColorAndOpacity[2]+"%)")
    this.bspTransparentMat[transParentBoxIndex]  = new THREE.MeshStandardMaterial({color :colorIn,   side:THREE.DoubleSide, emissive:"black",
        transparent:true, opacity:this.bspSideColorAndOpacity[3]});
    // this.bspTransparentMat.color.setHSL(300,0.6,0.6);

    this.bspTransparentMesh[transParentBoxIndex] = new THREE.Mesh(this.bspTransparentGeom[transParentBoxIndex],this.bspTransparentMat[transParentBoxIndex]);
    this.bspTransparentGeom[transParentBoxIndex].computeVertexNormals();
    this.bspTransparentGeom[transParentBoxIndex].computeFaceNormals();
    this.bspTransparentMesh[transParentBoxIndex].castShadow    = true;
    this.bspTransparentMesh[transParentBoxIndex].receiveShadow = true;

    scene.add(this.bspTransparentMesh[transParentBoxIndex]);

}



// générer la boite transparante
Ebk.BoxScreenPart.prototype.bsp_mx_generatedTransparentBoxBlock      = function() {

    this.bspTransparentGeom         = new Array(this.bspTransparentBoxCount);
    this.bspTransparentMat          = new Array(this.bspTransparentBoxCount);
    this.bspTransparentMesh         = new Array(this.bspTransparentBoxCount);

    if (this.bspTransparentBoxCount==1)    this.bsp_mx_generatedSingleTransparentBox(0);
    else  if (this.bspTransparentBoxCount>1) {

        for(var transparentBoxIndex = 0;transparentBoxIndex<this.bspTransparentBoxCount;transparentBoxIndex++) {
            this.bsp_mx_generatedSingleTransparentBox(transparentBoxIndex);
        }

    }


}


// générer une face d'affichage
Ebk.BoxScreenPart.prototype.bsp_mx_generatedDisplayFace              = function(faceIndex,vertices ,sideIn) {

    this.bspDisplayBoxFaces[faceIndex] = {};
    this.bspDisplayBoxFaces[faceIndex].geom  = new THREE.Geometry();
    this.bspDisplayBoxFaces[faceIndex].geom.vertices.push(new THREE.Vector3(vertices[0][0], vertices[0][1],vertices[0][2]));
    this.bspDisplayBoxFaces[faceIndex].geom.vertices.push(new THREE.Vector3(vertices[1][0], vertices[1][1],vertices[1][2]))
    this.bspDisplayBoxFaces[faceIndex].geom.vertices.push(new THREE.Vector3(vertices[2][0], vertices[2][1],vertices[2][2]))
    this.bspDisplayBoxFaces[faceIndex].geom.vertices.push(new THREE.Vector3(vertices[3][0], vertices[3][1],vertices[3][2]))
    //arriere
    this.bspDisplayBoxFaces[faceIndex].geom.faces.push(new THREE.Face3(0,1,2));
    this.bspDisplayBoxFaces[faceIndex].geom.faces.push(new THREE.Face3(0,2,3));


    this.uvmBuildUVsOnly({ uvmReferencePlane_mx:this.bspReferencePlane_mx ,
        uvmVertices_mx:this.bspDisplayBoxFaces[faceIndex].geom.vertices
    });


    this.bspDisplayBoxFaces[faceIndex].geom.faceVertexUvs[0] = this.uvmUVs_mx.slice();


    var colorIn = new THREE.Color("hsl("+this.bspDisplayColor[0]+","+this.bspDisplayColor[1]+"%,"+this.bspDisplayColor[2]+"%)")

    this.bspDisplayBoxFaces[faceIndex].geom.computeVertexNormals();
    this.bspDisplayBoxFaces[faceIndex].geom.computeFaceNormals();
    this.bspDisplayBoxFaces[faceIndex].mat  =  new THREE.MeshStandardMaterial({
        map: videoTexture,
        side:sideIn,
        color:colorIn
    });

    this.bspDisplayBoxFaces[faceIndex].mesh = new THREE.Mesh(   this.bspDisplayBoxFaces[faceIndex].geom, this.bspDisplayBoxFaces[faceIndex].mat);

    scene.add(this.bspDisplayBoxFaces[faceIndex].mesh);

}


// générer toutes les matrices
Ebk.BoxScreenPart.prototype.bsp_mx_generated                         = function() {

    this.bspDisplayBoxFaces         = new Array(this.bspDisplayFacesCount);
    this.bsp_mx_generatedTransparentBoxBlock();
    this.bsp_mx_generatedDisplayFace(0,  [this.bspVolumePoints[0],this.bspVolumePoints[1],
        this.bspVolumePoints[2],this.bspVolumePoints[3]] ,THREE.BackSide );
    this.bsp_mx_generatedDisplayFace(1,  [this.bspVolumePoints[4],this.bspVolumePoints[5],
        this.bspVolumePoints[6],this.bspVolumePoints[7]] ,THREE.FrontSide);
}

// Construire toutes les données en création
Ebk.BoxScreenPart.prototype.bspBuild                                = function(params){

    this.bspAssign(params);
    this.bspIni_operational_data();
    this.bsp_mx_generated();

};


// modifie une instance de boite transparante
Ebk.BoxScreenPart.prototype.bsp_mx_editSingleTransparentBox           = function(transParentBoxIndex) {

    this.uvmUpdateGeometryVertices(this.bspTransparentGeom[transParentBoxIndex],this.bspTransparentVolumePoints);

    var colorIn = new THREE.Color("hsl("+this.bspSideColorAndOpacity[0]+","+this.bspSideColorAndOpacity[1]+"%,"+this.bspSideColorAndOpacity[2]+"%)");
    this.bspTransparentMat[transParentBoxIndex].color     = colorIn;
    this.bspTransparentMat[transParentBoxIndex].opacity   = this.bspSideColorAndOpacity[3];

}

// générer la boite transparante
Ebk.BoxScreenPart.prototype.bsp_mx_editTransparentBoxBlock      = function() {

    if (this.bspTransparentBoxCount==1)    this.bsp_mx_editSingleTransparentBox(0);
    else  if (this.bspTransparentBoxCount>1) {

        for(var transparentBoxIndex = 0;transparentBoxIndex<this.bspTransparentBoxCount;transparentBoxIndex++) {
            this.bsp_mx_editSingleTransparentBox(transparentBoxIndex);
        }

    }

}

// générer une face d'affichage
Ebk.BoxScreenPart.prototype.bsp_mx_editDisplayFace              = function(faceIndex,vertices) {

    this.uvmGeometryContentXYPlaneUpdate_mx( this.bspDisplayBoxFaces[faceIndex].geom, vertices);

    var colorIn = new THREE.Color("hsl("+this.bspDisplayColor[0]+","+this.bspDisplayColor[1]+"%,"+this.bspDisplayColor[2]+"%)")

    this.bspDisplayBoxFaces[faceIndex].mat.color     = colorIn;

}


// générer toutes les matrices
Ebk.BoxScreenPart.prototype.bsp_mx_edit                              = function() {

    this.bsp_mx_editTransparentBoxBlock();
    this.bsp_mx_editDisplayFace( 0,  [this.bspVolumePoints[0],this.bspVolumePoints[1],
        this.bspVolumePoints[2],this.bspVolumePoints[3]] );
    this.bsp_mx_editDisplayFace(1,  [this.bspVolumePoints[4],this.bspVolumePoints[5],
        this.bspVolumePoints[6],this.bspVolumePoints[7]]);
}

// Construire toutes les données en modification
Ebk.BoxScreenPart.prototype.bspUpdate                                = function(params){

    this.bspAssign(params);
    this.bspIni_operational_data();
    this.bsp_mx_edit();

};

//nettoyer la mémoire :
Ebk.BoxScreenPart.prototype.bspCleanUpTransparentBoxBlock            = function() {

    if (this.bspTransparentBoxCount==1) {
        scene.remove(this.bspTransparentMesh[0])
        this.bspTransparentGeom[0].dispose();
        this.bspTransparentMat[0].dispose();
    }
    else  if (this.bspTransparentBoxCount>1) {
        for(var transparentBoxIndex = 0;transparentBoxIndex<this.bspTransparentBoxCount;transparentBoxIndex++) {
            scene.remove(this.bspTransparentMesh [transparentBoxIndex])
            this.bspTransparentGeom[transparentBoxIndex].dispose();
            this.bspTransparentMat[transparentBoxIndex].dispose();
        }

    }
}

//nettoyer la mémoire :
Ebk.BoxScreenPart.prototype.bspCleanUpDisplay                        = function() {

    scene.remove(this.bspDisplayBoxFaces[0].mesh);
    this.bspDisplayBoxFaces[0].geom.dispose();
    this.bspDisplayBoxFaces[0].mat.dispose();
    scene.remove(this.bspDisplayBoxFaces[1].mesh)
    this.bspDisplayBoxFaces[1].geom.dispose();
    this.bspDisplayBoxFaces[1].mat.dispose();

}


//nettoyer la mémoire
Ebk.BoxScreenPart.prototype.bspCleanUpMemory         = function() {

    this.bspCleanUpTransparentBoxBlock();
    this.bspCleanUpDisplay();
};



/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* revoi une position dans une boite *******/
Ebk.BoxTransitions                                                    = function(params) {

    Ebk.BoxScreenPart.call(this);

    this.bxtTransitionCollection = new  Ebk.TransitionCollection();

};

Ebk.BoxTransitions.prototype                                         = Object.create(Ebk.BoxScreenPart.prototype);
Ebk.BoxTransitions.prototype.constructor                             = Ebk.BoxTransitions;

// renvoi le vertex d'un coin
Ebk.BoxTransitions.prototype.bxtGetCornerVertex                      = function(vertexIndex,x0,y0,z0,width,height,depth) {
    var result;
    switch(vertexIndex) {

        case 0: result =[x0-width,y0-height,z0+depth];
            break;
        case 1:
            result =[x0+width,y0-height,z0+depth];
            break;
        case 2:
            result =[x0+width,y0+height,z0+depth];
            break;
        case 3:
            result =[x0-width,y0+height,z0+depth];
            break;
        case 4:
            result =[x0-width,y0-height,z0-depth];
            break;
        case 5:
            result =[x0+width,y0-height,z0-depth];
            break;
        case 6:
            result =[x0+width,y0+height,z0-depth];
            break;
        case 7:
            result =[x0-width,y0+height,z0-depth];
            break;
        default:
            result =[x0-width,y0-height,z0+depth];
    }


    return result;
};


// renvoi une matrice de vertices en fonctin des index indiqués
Ebk.BoxTransitions.prototype.bxtGetVerticesMx                      = function(VerticesindexesMx,x0,y0,z0,width,height,depth) {

    var result =[];
      for(var vertexIndex =0;vertexIndex<VerticesindexesMx.length;vertexIndex++){
          result.push(this.bxtGetCornerVertex(VerticesindexesMx[vertexIndex],x0,y0,z0,width,height,depth));
      }
    return result;
};

//renvoie l'ensemple de vertices d'une trajectoire
Ebk.BoxTransitions.prototype.bxtGetPath                         = function(pathIndex,x0,y0,z0,width,height,depth) {

    var result
    switch(pathIndex) {

        case 0:
            result = this.bxtGetVerticesMx([0,1,2,3,0],x0,y0,z0,width,height,depth);
            break;
        case 1:
            result = this.bxtGetVerticesMx([1,5,6,2,1],x0,y0,z0,width,height,depth);
            break;
        case 2:
            result = this.bxtGetVerticesMx([5,4,7,6,5],x0,y0,z0,width,height,depth);
            break;
        case 3:
            result = this.bxtGetVerticesMx([4,0,3,7,4],x0,y0,z0,width,height,depth);
            break;
        case 4:
            result = this.bxtGetVerticesMx([0,1,5,4,0],x0,y0,z0,width,height,depth);
            break;
        case 5:
            result = this.bxtGetVerticesMx([3,2,6,7,3],x0,y0,z0,width,height,depth);
            break;
        case 6:
            result = this.bxtGetVerticesMx([0,5,6,3,0],x0,y0,z0,width,height,depth);
            break;
        case 7:
            result = this.bxtGetVerticesMx([4,1,2,7,4],x0,y0,z0,width,height,depth);
            break;
        case 8:
            result = this.bxtGetVerticesMx([0,3,2,1,5,6,7,4,0],x0,y0,z0,width,height,depth);
            break;
        case 9:
            result = this.bxtGetVerticesMx([4,7,6,5,1,2,3,0,4],x0,y0,z0,width,height,depth);
            break;
        case 10:
            result = this.bxtGetVerticesMx([0,1],x0,y0,z0,width,height,depth);
            break;
        case 11:
            result = this.bxtGetVerticesMx([1,2],x0,y0,z0,width,height,depth);
            break;
        case 12:
            result = this.bxtGetVerticesMx([3,2],x0,y0,z0,width,height,depth);
            break;
        case 13:
            result = this.bxtGetVerticesMx([3,0],x0,y0,z0,width,height,depth);
            break;
        case 14:
            result = this.bxtGetVerticesMx([1,5],x0,y0,z0,width,height,depth);
            break;
        case 15:
            result = this.bxtGetVerticesMx([5,6],x0,y0,z0,width,height,depth);
            break;
        case 16:
            result = this.bxtGetVerticesMx([5,4],x0,y0,z0,width,height,depth);
            break;
        case 17:
            result = this.bxtGetVerticesMx([4,7],x0,y0,z0,width,height,depth);
            break;
        case 18:
            result = this.bxtGetVerticesMx([7,6],x0,y0,z0,width,height,depth);
            break;
        case 19:
            result = this.bxtGetVerticesMx([4,0],x0,y0,z0,width,height,depth);
            break;
        case 20:
            result = this.bxtGetVerticesMx([0,3],x0,y0,z0,width,height,depth);
            break;
        case 21:
            result = this.bxtGetVerticesMx([3,7],x0,y0,z0,width,height,depth);
            break;
        case 22:
            result = this.bxtGetVerticesMx([7,2],x0,y0,z0,width,height,depth);
            break;
        case 23:
            result = this.bxtGetVerticesMx([3,6],x0,y0,z0,width,height,depth);
            break;
        case 24:
            result = this.bxtGetVerticesMx([0,5],x0,y0,z0,width,height,depth);
            break;
        case 25:
            result = this.bxtGetVerticesMx([4,1],x0,y0,z0,width,height,depth);
            break;
        default:
            result = this.bxtGetVerticesMx([0,1,2,3,0],x0,y0,z0,width,height,depth);
    }


    return result;
};

// renvoi une transition spécifique
Ebk.BoxTransitions.prototype.bxtGetTransition                        = function(pathIndex,x0,y0,z0,width,height,depth,tType,step_index, step_count,tFact_Mx,isTriggerOnce,isRepeat) {

    var result,intervalCollection_mx ;
    intervalCollection_mx = this.bxtGetPath(pathIndex,x0,y0,z0,width,height,depth);
    //if  (step_index ==  3) console.log(intervalCollection_mx);
    result                = this.bxtTransitionCollection.trscGetItemsStep(tType,step_index,step_count,intervalCollection_mx, tFact_Mx,isTriggerOnce,isRepeat);
    return result;
};



//vvv =   ebkObj.trscGetItemsStep(1,counter,step_count,[[-2,1,0],[2,0,1],[0,0,0],[1,0,0],[0,1,1]],
//      [-0.09,-0.05,-.0008,-0.03,-0.015,-0.05,-0.03,-0.015,-04.05,-0.015,-0.05],
//       0.1,.001,.091,once,repeat);

/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/*||||||||||||||||*/
/******* Relief *******/

Ebk.ThreejsRoutines                                                  = function(params) {
    Ebk.BoxScreenPart.call(this);
};


Ebk.ThreejsRoutines.prototype             = Object.create( Ebk.BoxScreenPart.prototype);
Ebk.ThreejsRoutines.prototype.constructor = Ebk.ThreejsRoutines;

//Construction de l'ensemble
Ebk.Dilatation.Vectors.prototype.tjsrToVertices              = function(mx) {

    var vertices = [];

    for(var vertexIndex=0;vertexIndex<mx.length;vertexIndex++){

        vertices.push(new THREE.Vector3(mx[vertexIndex][0],
                                        mx[vertexIndex][1],
                                        mx[vertexIndex][2]));

    }

    return vertices.slice();
};


