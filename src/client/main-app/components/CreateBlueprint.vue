<template>
<div class="create-blueprint__container container">
  <div class="switch">
    <label>
      立体图
      <input type="checkbox" v-model="editMode">
      <span class="lever"></span>
      平面图
    </label>
  </div>
  <edit-panel
    v-if="editMode"
    class="create-blueprint__edit-panel"
    :svg="svg"
  >
  </edit-panel>
  <view-panel
    v-else
    class="create-blueprint__view-panel"
    :svg="svg"
  >
  </view-panel>
</div>
</template>

<script>
import Snap from 'Snap'

import BlueprintEditPanel from './BlueprintEditPanel'
import BlueprintViewPanel from './BlueprintViewPanel'

const DEFAULT_SIZE = 600

export default {
  name: 'CreateBlueprint',

  components: {
    EditPanel: BlueprintEditPanel,
    ViewPanel: BlueprintViewPanel
  },

  props: {
    svgUrl: {
      type: String
    }
  },

  data() {
    let svg = null
    if (this.svgUrl) {
      Snap.load(this.svgUrl, (_svg) => {
        svg = _svg
      })
    } else {
      svg = Snap(DEFAULT_SIZE, DEFAULT_SIZE)
    }

    return {
      editMode: true,
      backgroundUrl: '/images/blueprint-demo.jpg',
      svg
    }
  }
}
</script>

<style lang="stylus">
@import '../../palette'

canvas-width = 720px
canvas-height = 680px

.create-blueprint
  &__container
    margin-top 3%
    color color-grey-darken-2
</style>
