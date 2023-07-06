<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { getToken } from '@/utils/auth/1688';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  onMounted(async () => {
    const token = await getToken();
    if (token) {
      // 成功拿到token，则返回
      // router.replace({ name: 'source-goods-1688' });
      router.push({ name: 'source-goods-1688' });
    }
  });
</script>
