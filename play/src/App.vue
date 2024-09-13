<template>
  <play-panel title="Form">
    <el-upload
      v-model:file-list="fileList"
      :multiple="true"
      :limit="20"
      :on-exceed="onExceed"
      :on-start="onStart"
      :on-change="onChange"
      :http-request="httpRequest"
    >
      <el-button> 点击上传 </el-button>
    </el-upload>
  </play-panel>

  <!-- Upload -->
  <play-panel title="Upload">
    {{ fileList }}
    <m2-upload
      v-model:file-list="fileList"
      :multiple="true"
      :limit="20"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove"
      :on-exceed="onExceed"
      :on-start="onStart"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-pregress="onProgress"
      action="http://localhost:4000/upload"
      :http-request="httpRequest"
    >
      <template #tip> <div style="font-size: 12px; color: #909399">点击按钮进行上传</div> </template>
      <m2-button type="primary"> 点击上传 </m2-button>
      <template #file="{ file, index }">
        {{ index }}. {{ file.name }} {{ file.size }}Byte {{ file.percentage }}%
      </template>
    </m2-upload>
  </play-panel>

  <play-panel title="Upload-drag">
    <m2-upload
      v-model:file-list="fileList"
      :multiple="true"
      :limit="20"
      :disabled="false"
      :drag="true"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove"
      :on-exceed="onExceed"
      :on-start="onStart"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :on-pregress="onProgress"
      action="http://localhost:4000/upload"
      :http-request2="httpRequest"
    >
      <m2-icon class="el-icon--upload"><arrow-up-circle-outline /></m2-icon>
      <div>拖拽上传</div>
    </m2-upload>
  </play-panel>

  <!-- Form -->
  <play-panel title="Form">
    <m2-form
      ref="formRef"
      :model="model"
      :rules="{
        username: [{ min: 3, message: '至少输入3个字', trigger: ['blur'] }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '格式不正确' },
          { max: 11, message: '至多11位数字', trigger: ['blur', 'change'] }
        ]
      }"
      @validate="validate"
    >
      <m2-form-item
        prop="username"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 5, message: '至多输入5个字', trigger: ['blur', 'change'] },
          { pattern: /^[a-zA-Z]+$/, message: '只能输入英文字母' }
        ]"
      >
        <template #label> <label>用户名</label></template>
        <m2-input
          v-model="model.username"
          placeholder="请输入用户名"
        />
      </m2-form-item>
      <m2-form-item
        label="手机号"
        prop="phone"
        :show-message="true"
      >
        <m2-input
          v-model="model.phone"
          placeholder="请输入手机号"
        />
      </m2-form-item>
    </m2-form>
    <m2-button
      type="primary"
      @click="submit"
    >
      提交
    </m2-button>
    <m2-button
      type="primary"
      @click="validateUsername"
    >
      校验用户名
    </m2-button>
    <m2-button
      type="primary"
      @click="clearValidate"
    >
      清楚校验信息
    </m2-button>
  </play-panel>

  <!-- Icon -->
  <play-panel title="Icon">
    <m2-icon
      :size="20"
      color="green"
    >
      <add-circle />
    </m2-icon>
    <m2-icon
      :size="20"
      color="red"
    >
      <arrow-undo />
    </m2-icon>
  </play-panel>

  <!-- Tree -->
  <play-panel title="Tree同步加载">
    {{ selectedKeysRef }}
    {{ checkedKeysRef }}
    <m2-tree
      v-model:selected-keys="selectedKeysRef"
      v-model:checked-keys="checkedKeysRef"
      :data="treeData"
      :selectable="false"
      :multiple="true"
      :node-padding-left="30"
      :show-checkbox="true"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    >
      <template #default="{ node }"> {{ node.key }} ~~ {{ node.label }} </template>
    </m2-tree>
  </play-panel>
  <play-panel title="Tree异步加载">
    <m2-tree
      :data="treeAsyncData"
      :on-load="handleLoad"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    >
      <template #default="{ node }"> {{ node.key }} __ {{ node.label }} </template>
    </m2-tree>
  </play-panel>

  <!-- Virtual List -->
  <play-panel title="虚拟滚动">
    <m2-tree
      :data="treeVirtualData"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
      :virtual-scroll="true"
      :remain="8"
      :size="30"
    />
  </play-panel>

  <!-- Checkbox -->
  <play-panel title="复选框">
    {{ checked1 }}
    <m2-checkbox
      v-model="checked1"
      label="Option 1"
    >
      北京
    </m2-checkbox>

    {{ checked2 }}
    <m2-checkbox
      v-model="checked2"
      label="Option 2"
      :true-value="100"
      :false-value="200"
      :indeterminate="indeterminate"
    >
      ture=100 false=200
    </m2-checkbox>

    {{ checked3 }}
    <m2-checkbox
      v-model="checked3"
      label="Option 1"
      :disabled="true"
      :true-value="100"
      :false-value="200"
    >
      禁用
    </m2-checkbox>

    {{ checkList }}
    <m2-checkbox-group
      v-model="checkList"
      :min="1"
      :max="2"
      @change="handleCheckboxGroupChange"
    >
      <m2-checkbox
        label="Option A"
        value="A"
      />
      <m2-checkbox
        label="Option B"
        value="B"
      />
      <m2-checkbox
        label="Option C"
        value="C"
      />
      <m2-checkbox
        label="Option D"
        value="D"
      />
      <m2-checkbox
        label="Option E"
        value="E"
        :disabled="true"
      />
    </m2-checkbox-group>
  </play-panel>

  <!-- Button -->
  <play-panel title="Button">
    <m2-button @click="handleClick">Default</m2-button>
    <m2-button
      type="primary"
      @click="handleClick"
    >
      Primary
    </m2-button>
    <m2-button type="success"> Success </m2-button>
    <m2-button type="info">Info</m2-button>
    <m2-button type="warning">Warning</m2-button>
    <m2-button type="danger">Danger</m2-button>
    <div style="padding: 10px 0">
      <m2-button
        size="large"
        :disabled="true"
        :round="true"
        :loading="true"
      >
        large
      </m2-button>
      <m2-button
        size="large"
        :disabled="true"
        :round="true"
        :loading="true"
      >
        large
        <template #loading>
          <m2-icon>
            <add-circle />
          </m2-icon>
        </template>
      </m2-button>
      <m2-button size="default">
        default
        <template #icon>
          <m2-icon>
            <arrow-undo />
          </m2-icon>
        </template>
      </m2-button>
      <m2-button
        size="small"
        icon-placement="right"
        :loading="false"
      >
        small
        <template #icon>
          <m2-icon>
            <arrow-redo />
          </m2-icon>
        </template>
      </m2-button>
    </div>
  </play-panel>

  <!-- Input -->
  <play-panel title="Input">
    {{ input1 }}
    <m2-input
      v-model="input1"
      placeholder="Please input"
      :show-password="true"
      :clearable="true"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    >
      <template #prefix>
        <m2-icon>
          <add-circle />
        </m2-icon>
      </template>
      <template #suffix>
        <m2-icon>
          <add-circle />
        </m2-icon>
      </template>
      <template #prepend> http://</template>
      <template #append>.com</template>
    </m2-input>
  </play-panel>
</template>

<script setup lang="ts">
import { AddCircle, ArrowUndo, ArrowRedo, ArrowUpCircleOutline } from '@vicons/ionicons5'
import PlayPanel from './components/panel'
import {
  selectedKeysRef,
  checkedKeysRef,
  treeData,
  treeAsyncData,
  handleLoad,
  treeVirtualData
} from './components/tree'
import {
  checked1,
  checked2,
  checked3,
  checkList,
  indeterminate,
  handleCheckboxGroupChange
} from './components/checkbox'
import { handleClick } from './components/button'
import { input1, handleInputFocus, handleInputBlur } from './components/input'
import { formRef, model, validate, submit, validateUsername, clearValidate } from './components/form'
import {
  fileList,
  handleBeforeUpload,
  handleBeforeRemove,
  onExceed,
  onStart,
  onChange,
  onError,
  onSuccess,
  onProgress,
  httpRequest
} from './components/upload'
</script>

<style lang="scss">
.play-app__panel {
  margin-bottom: 30px;
}
.play-app__panel-title {
  margin: 0;
}
.play-app__panel-container {
  background-color: #f0f0f0;
}
.m2-button {
  & + .m2-button {
    margin-left: 12px;
  }
}
</style>
