<template>
  <div class="page-wrap">
    <a-tabs v-model:active-key="state.activeKey">
      <a-tab-pane key="1" title="链接铺货">
        <a-row :gutter="[16, 16]">
          <a-col :span="24">
            <div class="w-full flex flex-col items-center justify-center">
              <a-typography-paragraph class="text-lg mb-4">
                <span class="mr-4">链接上货</span>
                <span>在下方输入框内粘贴1688商品链接</span>
              </a-typography-paragraph>
              <a-textarea
                v-model:model-value="state.link"
                auto-size
                allow-clears
                placeholder="https://detail.1688.com/offer/640581865174.html"
              />
            </div>
          </a-col>
          <a-col v-if="ids.length > 0" :span="24">检索出的商品id</a-col>
          <a-col v-if="ids.length > 0" :span="24">
            <span v-for="(item, index) in ids" :key="item">
              {{ item }}
              <a-divider v-if="index < ids.length - 1" direction="vertical" />
            </span>
          </a-col>
          <a-col :span="24">
            <a-row justify="end">
              <a-button type="primary" :disabled="!ids" @click="goodsSubmit"
                >提交</a-button
              >
            </a-row>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" title="图片找同款">图片找同款</a-tab-pane>
      <a-tab-pane key="3" title="链接找同款">链接找同款</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue';
  import { computed, reactive } from 'vue';

  interface State {
    /** tabs的key */
    activeKey: string;
    /** 1688链接 */
    link: string;
  }

  /** 状态 */
  const state = reactive<State>({
    activeKey: '1',
    link: '',
  });

  /** 商品ids */
  const ids = computed(() => {
    /** 根据link匹配除商品id */
    return [
      ...new Set(
        state.link
          ?.match?.(/(?<=https:\/\/detail.1688.com\/offer\/)\d+(?=\.html)/g)
          /** 类型转换为string[] */
          ?.map?.((ele) => ele)
      ),
    ];
  });

  /** 商品铺货 */
  const goodsSubmit = () => {
    Message.success('铺货提交成功');
    state.link = '';
  };
</script>
