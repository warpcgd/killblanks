<template>
  <div class="skeleton-toolEdit">
    <Row type="flex" :gutter="16" justify="space-between" align="top">
      <Col span="12">
        <span>Text</span>
        <Form :model="mod" inline>
          <FormItem label="color" :label-width="40">
            <ColorPicker v-model="mod.text.color" size="small" />
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <span>Image</span>
        <Form :model="mod" inline>
          <FormItem label="color" :label-width="40">
            <ColorPicker v-model="mod.image.color" size="small" />
          </FormItem>
          <FormItem label="shape" :label-width="50">
            <Select v-model="mod.image.shape" size="small">
              <Option value="rect">rect</Option>
              <Option value="circle">circle</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Divider dashed />
      <Col span="12">
        <span>Button</span>
        <Form :model="mod" inline>
          <FormItem label="color" :label-width="40">
            <ColorPicker v-model="mod.button.color" size="small" />
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <span>SVG</span>
        <Form :model="mod" inline>
          <FormItem label="color" :label-width="40">
            <ColorPicker v-model="mod.svg.color" size="small" />
          </FormItem>
          <FormItem label="shape" :label-width="50">
            <Select v-model="mod.svg.shape" size="small">
              <Option value="rect">rect</Option>
              <Option value="circle">circle</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Divider dashed />
      <Col span="12">
        <span>Pseudo</span>
        <Form :model="mod" inline>
          <FormItem label="color" :label-width="40">
            <ColorPicker v-model="mod.pseudo.color" size="small" />
          </FormItem>
          <FormItem label="shape" :label-width="50">
            <Select v-model="mod.pseudo.shape" size="small">
              <Option value="rect">rect</Option>
              <Option value="circle">circle</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <span>skipPseudo</span>
        <Form :model="mod" inline>
          <FormItem label="condition" :label-width="60">
            <i-switch v-model="mod.skipPseudo" size="small" />
          </FormItem>
        </Form>
      </Col>
      <Divider dashed />
      <Col span="12">
        <span>animation</span>
        <Form :model="mod" inline>
          <FormItem label="condition" :label-width="60">
            <i-switch v-model="mod.animation" size="small" />
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <span>repeatLI</span>
        <Form :model="mod" inline>
          <FormItem label="condition" :label-width="60">
            <i-switch v-model="mod.repeatLI" size="small" />
          </FormItem>
        </Form>
      </Col>
      <Divider dashed />
      <Col span="12">
        <span>skipBase64</span>
        <Form :model="mod" inline>
          <FormItem label="condition" :label-width="60">
            <i-switch v-model="mod.skipBase64" size="small" />
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import { DEFAULTMOD } from '@killblank/skeleton'
export default {
  data() {
    return {
      mod: DEFAULTMOD
    }
  }
}
</script>
<style lang="scss">
.skeleton-toolEdit {
  padding: 10px 20px;
  .ivu-form-item {
    margin-bottom: 10px;
  }
  .ivu-col-span-6 {
    margin-top: 10px;
  }
  .ivu-divider-horizontal {
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>
