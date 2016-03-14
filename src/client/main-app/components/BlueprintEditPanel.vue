<template>
<div class="blueprint-edit-panel__container">
  <div class="blueprint-edit-panel__menu">
    <div class="range-field">
      <input type="range" min="50" max="1000" value="600" @input="onCanvasSizeChange"/>
      <label>画布大小</label>
    </div>
    <div class="range-field">
      <input type="range" min="50" max="1000" value="600" @input="onBackgroundSizeChange"/>
      <label>户型图大小</label>
    </div>
  </div>
  <div id="blueprint-edit-panel__svg-container">
    <div>
      {{'x=' + mousePos.x + ', y=' + mousePos.y}}
    </div>
  </div>
</div>
</template>

<script>
const DEFAULT_SIZE = 600

export default {
  name: 'BlueprintEditPanel',

  props: {
    svg: {
      type: Object
    }
  },

  data() {
    return {
      backgroundUrl: '/images/blueprint-demo.jpg',
      background: null,
      mousePos: { x: -1, y: -1 },
      drawingLine: null
    }
  },

  methods: {
    onCanvasSizeChange(event) {
      this.svg.attr({
        width: event.target.value,
        height: event.target.value
      })
    },

    onBackgroundSizeChange(event) {
      this.background.attr({
        width: event.target.value,
        height: event.target.value
      })
    },

    onMousemove(event) {
      const { mousePos, drawingLine } = this
      mousePos.x = event.offsetX
      mousePos.y = event.offsetY
      if (drawingLine) {
        const x1 = Number(drawingLine.attr('x1'))
        const y1 = Number(drawingLine.attr('y1'))
        const deltaX = Math.abs(mousePos.x - x1)
        const deltaY = Math.abs(mousePos.y - y1)
        if (deltaX > deltaY) {
          drawingLine.attr({
            x2: mousePos.x,
            y2: y1
          })
        } else {
          drawingLine.attr({
            x2: x1,
            y2: mousePos.y
          })
        }
      }
    },

    onKeydown(event) {
      // Esc
      if (event.keyCode === 27) {
        if (this.drawingLine) {
          this.drawingLine.remove()
          this.drawingLine = null
        }
      }
    },

    onDrawLine() {
      const { mousePos, svg, drawingLine } = this
      let x1 = mousePos.x
      let y1 = mousePos.y
      let x2 = mousePos.x
      let y2 = mousePos.y

      if (drawingLine) {
        drawingLine.attr({
          stroke: '#006064'
        })
        x1 = Number(drawingLine.attr('x2'))
        y1 = Number(drawingLine.attr('y2'))
      }

      this.drawingLine = svg.line(x1, y1, x2, y2)
      .attr({
        stroke: '#00bcd4',
        strokeWidth: 5
      })
    }
  },

  ready() {
    document.getElementById('blueprint-edit-panel__svg-container').appendChild(this.svg.node)
    this.svg.click(this.onDrawLine)
    this.svg.mousemove(this.onMousemove)
    this.background = this.svg.image(this.backgroundUrl).attr({ width: DEFAULT_SIZE })
    document.addEventListener('keydown', this.onKeydown)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeydown)
    this.svg.unclick(this.onDrawLine)
    this.svg.unmousemove(this.onMousemove)
  }
}
</script>

<style lang="stylus">
svg
  //width canvas-width
  //height canvas-height
  margin 0 auto
  border 1px solid grey
  box-sizing border-box
</style>
