// por padrao, a primeira imagem vai ser display block
const slide = {
    position: 0,
    maxPosition: 2,
    images: document.getElementsByClassName("mySlides"),

    praFrente() {
        this.position++;

        if (this.position > this.maxPosition) {
            this.position = 0;
        }
        this.showImage();
        console.log(slide.position)

    },

    praTras() {
        this.position--;

        if (this.position < 0) {
            this.position = this.maxPosition;
        }
        this.showImage()
        console.log(slide.position)

    },

    showImage() {
        for(let i = 0; i <= this.maxPosition; i++) {
            this.images[i].style.display = 'none';
        }

        this.images[this.position].style.display = 'block'
    }



}

// percorrer todas as imagens e dar display none em todas, menos ao do indice atual

slide.showImage();

console.log(typeof slide.images)

