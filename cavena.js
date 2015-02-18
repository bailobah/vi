window.onload = function()
{
    var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }

//On n'oublie pas de récupérer l'objet canvas et son context.

context.beginPath(); //On démarre un nouveau tracé.
context.arc(100, 100, 50, 0, Math.PI*2); //On trace la courbe délimitant notre forme
context.fill(); //On utilise la méthode fill(); si l'on veut une forme pleine
context.closePath();
}
