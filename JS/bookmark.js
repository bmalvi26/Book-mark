document.getElementById('my-form').addEventListener('submit',savebookmark);

function savebookmark(e){

    var siteName=document.getElementById('site-name').value;
    var siteUrl = document.getElementById('website-url').value;
   
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    

    // we are testing if the data we eneter gets into local storage of browser or not.
    if(localStorage.getItem('bookmarks') === null){

        var bookmarks = []; // this is JSON array
        // added objects to array.
        bookmarks.push(bookmark);
        // Set to local storage.
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); // we need to store JSON array as string. It will turn it into string b4 we store it into local storage. 
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // it will turn it back into json. coz we need to add it to json array we created.
        // we need to add bookmarks to array.
        bookmarks.push(bookmark);
        // now we need to set it back to local storage.
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    fetchBookMark();
    e.preventDefault();
}
// to fetch  bookmarks.
function fetchBookMark(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarkResults');

    bookmarkResults.innerHTML = '';
    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url  = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                     '<h3>'+name+
                                     '<a class="btn btn-primary" target="blank" href=" '+url+'" >Visit</a>'+
                                     '<a onclick="deletebookMark(\''+url+'\')" class="btn btn-danger"  href="#" >Delete</a>'
                                      '</h3>'+
                                      '</div>';
    }

}

function deletebookMark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            // removing the url.
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookMark();
}