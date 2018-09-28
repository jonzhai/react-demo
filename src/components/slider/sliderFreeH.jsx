import React from 'react';
import BScroll from 'better-scroll';

import {addClass} from 'src/tools/dom';
import './style/sliderFreeH.scss';
class Slider extends React.Component {
    static defaultProps = { 
        interval: 2000,
        click: true,
        threshold: 0.3,
        speed: 1000

    }
    constructor(props){
        super(props);
        this.state = {
            currentPageIndex: 0
        }
        this._onScrollEnd = this._onScrollEnd.bind(this);
    }
    componentDidMount(){
        this.update();
        window.addEventListener('resize', () => {
            if (!this.slide || !this.slide.enabled) {
              return
            }
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
              if (this.slide.isInTransition) {
                this._onScrollEnd();
              } else {
                // if (this.autoPlay) {
                //   this._play();
                // }
              }
              this.refresh();
            }, 60)
        })
    }
    componentWillUnmount(){
        this.slide.disable();
        clearTimeout(this.timer);
    }
    update() {
        if (this.slide) {
          this.slide.destroy();
        }
        setTimeout(()=>{
            this.init();
        },20)
    }
    refresh() {
        this._setSlideWidth(true);
        this.slide.refresh();
    }
    init() {
        clearTimeout(this.timer);
        // this.currentPageIndex = 0;
        this.emitCurrentPageIndex(0);
        this._setSlideWidth();
        this._initSlide();
        // this.$emit('initSlide');
    }
    _setSlideWidth(isResize) {
        this.children = this.refs.slideGroup.children;
        let width = 0;
        let dpr = document.documentElement.getAttribute('data-dpr');
        let slideWidth;
        if(dpr === '1' || !dpr){
            slideWidth = this.refs.slider.clientWidth;
        }else{
            slideWidth = window.screen.width*window.devicePixelRatio;
        }
        // let slideWidth = this.$refs.slide.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = slideWidth + 'px';
          width += slideWidth;
        }
        // if (this.loop && !isResize) {
        //   width += 2 * slideWidth;
        // }
        this.refs.slideGroup.style.width = width + 'px';
    }
    _initSlide() {
        // console.log(this.threshold)
        this.slide = new BScroll(this.refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          eventPassthrough: 'vertical',
          snap: {
            loop: false,
            threshold: this.props.threshold,
            speed: this.props.speed
          },
          bounce: false,
          stopPropagation: false,
          click: this.click
        })
        this.slide.on('scrollEnd', this._onScrollEnd);
        // this.slide.on('touchEnd', () => {
          // if (this.autoPlay) {
          //   this._play();
          // }
        // });
        // this.slide.on('beforeScrollStart', () => {
        //   if (this.autoPlay) {
        //     clearTimeout(this.timer);
        //   }
        // });
     
    }
    _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX;
        this.emitCurrentPageIndex(pageIndex);
    }
    componentDidUpdate(){
        // this.update();
    }
    emitCurrentPageIndex(pageIndex){
        this.currentPageIndex = pageIndex;
        this.props.getCurPageIndex && this.props.getCurPageIndex(pageIndex);        
    }
    goToPage() {
        this.slide && this.slide.goToPage.apply(this.slide, arguments)
    }
    render(){
        return (
            <div className="slider" ref="slider">
                <div className="slider-group" ref="slideGroup">
                    {React.Children.map(this.props.children, function (child) {
                        return <div>{child}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Slider;