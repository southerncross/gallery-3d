<template>
<div class="create-blueprint__container container">
  <svg id="create-blueprint__canvas" @click="onDrawLine"></svg>
  <div>
    {{'x=' + mousePos.x + ', y=' + mousePos.y}}
  </div>
</div>
</template>

<script>
import Snap from 'Snap'

export default {
  name: 'CreateBlueprint',

  data() {
    return {
      mousePos: { x: -1, y: -1 },
      canvas: null,
      drawingLine: null
    }
  },

  methods: {
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
      const { mousePos, canvas, drawingLine } = this
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

      this.drawingLine = canvas.line(x1, y1, x2, y2)
      .attr({
        stroke: '#00bcd4',
        strokeWidth: 5
      })
    }
  },

  ready() {
    this.canvas = Snap('#create-blueprint__canvas')
    this.canvas.mousemove(this.onMousemove)
    document.addEventListener('keydown', this.onKeydown)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeydown)
  }
}
</script>

<style lang="stylus">
@import '../../palette'

.create-blueprint
  &__container
    margin-top 10%
    color color-grey-darken-2

#create-blueprint__canvas
  width 720px
  height 680px
  margin 0 auto
  border 1px solid grey
</style>
