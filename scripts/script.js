// let imgData;

document.querySelector('.file-input').addEventListener('change',function(e){
    if (e.target.files[0] !== undefined) {
        const extName = e.target.files[0].name.split('.').pop();
        const extensions = ["png","jpeg","jpg","gif","svg","SVG","JPG","JPEG","PNG"];

        if(extensions.includes(extName)){
            document.querySelector('.my-img').src = (window.URL || window.webkitURL).createObjectURL(e.target.files[0])

            // imgData = {
            //     file: e.target.files[0],
            //     fileName: e.target.files[0].name,
            //     fileUrl: (window.URL || window.webkitURL).createObjectURL(e.target.files[0])
            // }
        }
    }
})

document.querySelector('.gen-form').addEventListener('submit',function(e){
    e.preventDefault();
    let formData = new FormData(document.querySelector('.gen-form'));

    fetch('http://localhost:5000/pdf',{
        method:"post",
        body:formData
    }).then(res => res.blob())
      .then(blob => {
        download(window.URL.createObjectURL(blob),'user.pdf');
    })
})

function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
    return false;
}