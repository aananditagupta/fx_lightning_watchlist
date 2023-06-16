import { Lightning, Colors } from '@lightningjs/sdk'
import { Row, Button } from '@lightningjs/ui-components'
import items from '../items.json'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object
  Row: typeof Row
  Button: typeof Button
  index: number
}

interface AppTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true
}

export class App
  extends Lightning.Component<AppTemplateSpec, AppTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: Colors('black').get(),
      },
      Row: {
        w: 500,
        h: 500,
        type: Row,
      },
    }
  }

  index = 0

  RowData = this.getByRef!('Row')

  override _init() {
    const tiles = items.map((item) => ({
      type: Button,
      w: 50,
      h: 100,
      autoResizeWidth: true,
      text: {
        text: item?.title,
        fontSize: 20,
      },
    }))
    this.patch({
      Row: {
        items: tiles,
      },
    })
  }

  get focusedItem() {
    return this.tag('Row')?.children[this.index]
  }

  // override _getFocused() {
  //   return this.focusedItem
  // }

  override _handleRight() {
    this.index += 1
    // this.animateToSelected()
    return true
  }

  // animateToSelected() {
  //   this.patch({
  //     smooth: {
  //       y: -this.focusedItem.finalY,
  //     },
  //   })
  // }

  focus() {
    this.patch({
      Row: {
        color: Colors('red').get(),
      },
    })
  }
  unfocus() {
    this.patch({
      Row: {
        color: Colors('white').get(),
      },
    })
  }
}
