import React from 'react';

import BScroll from 'better-scroll';
class Scroll extends React.Component {
    static defaultProps = { 
        probeType: 1,
        click : true,
        listenScroll : false,
        data : null,
        pullup : true,
        pullingDown : true ,
        beforeScroll : false,
        refreshDelay : 20,
        scrollY : true
    }
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        setTimeout(() => {
            this._initScroll()
        },20)
        
    }
    _initScroll() {
        if (!this.refs.wrapper) {
          return
        }
        console.log(this.props.scrollY)
        this.scroll = new BScroll(this.refs.wrapper, {
          probeType: this.props.probeType,
          click: true,
          tap: true,
          scrollX: !this.props.scrollY,
          scrollY: this.props.scrollY,
          pullDownRefresh: {
            threshold: 50,
            stop: 20
          },
          pullUpLoad: {
            threshold: 50
          },
          // scrollbar: {
          //   fade: true,
          //   interactive: true // 1.8.0 新增
          // }
        })
        if (this.props.click) {
          this.scroll.on('click', (pos) => {
            this.props.onClick(pos);
            // this.$emit('click', pos)
          })
        }
        if (this.props.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            // this.$emit('scroll', pos)
            this.props.listenScroll(pos);
          })
        }

        if (this.props.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            //   this.$emit('scrollToEnd')
            typeof this.props.pullup === "function" &&  this.props.pullup();
            }
          })
        }

        if (this.props.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            // this.$emit('beforeScroll')
            this.props.beforeScroll();
          })
        }
        this.scroll.on('pullingDown', ()=>{
        //   this.$emit('pullingDown')
            typeof this.props.pullingDown === "function" && this.props.pullingDown();
        });
        this.scroll.on('pullingUp', ()=>{
        //   this.$emit('pullingUp')
            typeof this.props.pullup === "function" && this.props.pullup();
        });
        this.scroll.on('scrollStart', ()=>{
        //   this.$emit('scrollStart')
            this.props.scrollStart && this.props.scrollStart();
        });
      }
      disable() {
        this.scroll && this.scroll.disable()
        }
      enable() {
        this.scroll && this.scroll.enable()
        }
      refresh() {
        this.scroll && this.scroll.refresh()
        }
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        }
       scrollBy() {
        this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
        }
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      finishPullDown(){
        this.scroll && this.scroll.finishPullDown();
        }
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      }

    componentDidUpdate(){
        setTimeout(() => {
            this.refresh()
          }, this.props.refreshDelay)
    }
    render(){
        let wrapperStyle = {
            width: '100%',
            height: '100%'

        }
        return (
            <div className="wrapper" ref="wrapper" style={wrapperStyle}>
                {React.Children.map(this.props.children, function (child) {
                    return child;
                  })
                }
            </div>
        )
    }
}

export default Scroll;