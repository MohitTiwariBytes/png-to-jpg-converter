// script.js

document.getElementById('convertButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('please provide a file');
        return;
    }
    
    if (file.type !== 'image/png') {
        alert('please provide a png file');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                
                const outputImage = document.getElementById('outputImage');
                const downloadLink = document.getElementById('downloadLink');
                
                outputImage.src = url;
                outputImage.style.display = 'block';
                
                const customFileName = 'codedbymohit.jpg';
                downloadLink.href = url;
                downloadLink.download = customFileName;
                downloadLink.style.display = 'inline';
            }, 'image/jpeg');
        };
    };
    
    reader.readAsDataURL(file); 
});
