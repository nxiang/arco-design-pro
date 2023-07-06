export interface ProductListParams {
  /** 选品规划id */
  ruleId?: string;
  /** 1688类目id */
  categoryId?: string;
  /** 商品关键词 */
  keywords?: string;
  /** 商品置顶，只会在第一页置顶，和分页大小相同最多50个 */
  topOfferIds?: string[];
  /** 非必填，默认为1 */
  pageNo?: number;
  /** 非必填，默认为20 */
  pageSize?: number;
}

type ServiceList = {
  /** 名称码，示：qtwlybt */
  code: string;
  /** 名称，示：七天无理由包退 */
  name: string;
};

export type ResultListItem = {
  /** 商品id */
  itemId: number;
  /** 图片链接 */
  imgUrl: string;
  /** 商品标题 */
  title: string;
  /** 商品90天销量 */
  salesCnt90d: number;
  /** 最大价格（分） */
  maxPrice: number;
  /** 最小价格（分） */
  minPrice: number;
  /** 服务列表 */
  serviceList: Array<ServiceList>;
};

export type ProductListResponse = Promise<{
  result: {
    /** 是否成功 */
    success: boolean;
    /** 错误码 */
    code: string;
    /** 错误信息 */
    message: string;
    /** 结果 */
    result: {
      /** 页码 */
      pageIndex: number;
      /** 总条数 */
      totalRecords: number;
      /** 每页大小 */
      sizePerPage: number;
      /** 结果列表 */
      resultList: Array<ResultListItem>;
    };
  };
}>;

export interface ProductDetailListParams {
  offerIds: Array<string>;
}

/** 商品属性和属性值 */
interface Attribute {
  /** 属性ID */
  attributeID: string;
  /** 属性名称 */
  attributeName: string;
  /** 是否为自定义属性，国际站无需关注 */
  isCustom: boolean;
  /** 属性值 */
  value: string;
  /** 属性值ID */
  valueID: string;
}

/** 产品业务的支持信息,support为false说明不支持. */
interface BizGroupInfo {
  /** 垂直市场标记 */
  code: string;
  /** 垂直市场名字，如微供市场、货品市场 */
  description: string;
  /** 是否支持 */
  support: boolean;
}

/** 业务类型。1：商品，2：加工，3：代理，4：合作，5：商务服务。国际站按默认商品。 */
type BizType = 1 | 2 | 3 | 4 | 5;

/** 商品扩展信息 */
interface ExtendInfo {
  key: string;
  value: string;
}

/** 商品主图 */
interface Image {
  /** 主图列表，使用相对路径，需要增加域名：https://cbu01.alicdn.com/ */
  images: Array<string>;
  /** 是否打水印，是(true)或否(false)，1688无需关注此字段，1688的水印信息在上传图片时处理 */
  isWatermark: boolean;
  /** 水印是否有边框，有边框(true)或者无边框(false)，1688无需关注此字段，1688的水印信息在上传图片时处理 */
  isWatermarkFrame: boolean;
  /** 水印位置，在中间(center)或者在底部(bottom)，1688无需关注此字段，1688的水印信息在上传图片时处理 */
  watermarkPosition: string;
}

/** 算法优化后的规格图片 */
interface SkuImage {
  /** 算法处理后的图片地址，未处理则返回原图片地址 */
  imageUrl: string;
  /** skuId */
  skuId: string;
}

/** 商品算法智能改写信息，包含算法优化后的商品标题和图片信息，未改写的则直接返回原标题和原图片 */
interface IntelligentInfo {
  /** 算法优化后的详情图片 */
  descriptionImages: Array<string>;
  /** 算法优化后的商品图片 */
  images: Array<string>;
  /** 算法优化后的规格图片 */
  skuImages: Array<SkuImage>;
  /** 算法优化后的详情图片 */
  title: string;
}

/** 私密商品私密价格信息 */
interface OfferPrivatePriceInfo {
  /** 具体会员等级价格（普通，高级，vip，至尊vip，初级）注意会员顺序 */
  privatePriceInfo: string;
  /** skuid，非规格报价为0 */
  skuId: string;
}

/** 私密价格信息 */
interface PrivateChannelInfo {
  /** 私密商品私密价格信息 */
  offerPrivatePriceInfo: OfferPrivatePriceInfo;
}

interface ReserveRange {
  /** 开始金额 */
  beginAmount: string;
  /** 周期 */
  date: string;
  /** 结束金额 */
  endAmount: string;
}

interface SampleInfo {
  /** 是否支持打样 */
  isSupportSample: boolean;
  /** 打样周期（单位：天） */
  period: number;
  /** 打样价格（单位：元 */
  price: string;
}

/** 加工定制信息 */
interface ProcessingInfo {
  /** 定制方式，可选值: processing、sku */
  customType: Array<string>;
  /** 定制商品样图 */
  images: Array<string>;
  /** 价格区间的最高价 */
  maxPrice: string;
  /** 最小起订量 */
  minOrderQuantity: string;
  /** 价格区间的最低价 */
  minPrice: string;
  /** 出货周期 */
  reserveRanges: Array<ReserveRange>;
  /** 样品交期 */
  sampleDelivery: number;
  /** 打样信息 */
  sampleInfo: SampleInfo;
  /** 关联现货商品的id列表 */
  stockOfferIds: Array<string>;
  /** 是否支持拿样 */
  supportTakeSample: boolean;
  /** 品维度拿样价，在不是 sku 规格报价时有效 */
  takeSamplePrice: string;
}

/** 订货区间信息 */
interface ReserveRangeInfo {
  /** 出货时间(天) */
  period: number;
  /** 订货数量，不能大于「最大订货量」 */
  quantity: string;
}

/** 订货数据 */
interface ReserveInfo {
  /** 最大订货量 */
  maxQuantity: string;
  /** 最小订货量 */
  minQuantity: string;
  /** 订货区间信息 */
  reserveRangeInfos: Array<ReserveRangeInfo>;
  /** 是否支持订货 */
  supportReserve: boolean;
}

/** 区间价格。按数量范围设定的区间价格 */
interface PriceRange {
  /** 商品价格 */
  price: number;
  /** 商品起订数量 */
  startQuantity: number;
}

/** 商品销售信息 */
interface SaleInfo {
  /** 可售数量，国际站无需关注此字段 */
  amountOnSale: string;
  /** 每批数量，默认为空或者非零值，该属性不为空时sellunit为必填 */
  batchNumber: number;
  /** 分销基准价。代销场景均使用该价格。有SKU商品查看skuInfo中的consignPrice */
  consignPrice: string;
  /** 发货时间限制（非买保发货周期），按开计算 */
  deliveryLimit: number;
  /** 库存扣减方式，1是下单减库存，2是付款减库存 */
  invReduceType: string;
  /** 最小起订量，范围是1-99999。 */
  minOrderQuantity: number;
  /** 是否支持混批，国际站无需关注此字段 */
  mixWholeSale: boolean;
  /** 是否价格私密信息，国际站无需关注此字段 */
  priceAuth: boolean;
  /** 区间价格。按数量范围设定的区间价格 */
  priceRanges: Array<PriceRange>;
  /** 普通报价-FIXED_PRICE("0"),SKU规格报价-SKU_PRICE("1"),SKU区间报价（商品维度）-SKU_PRICE_RANGE_FOR_OFFER("2"),SKU区间报价（SKU维度）-SKU_PRICE_RANGE("3")，国际站无需关注 */
  quoteType: 0 | 1 | 2 | 3;
  /** 建议零售价，国际站无需关注 */
  retailprice: number;
  /** 销售方式，按件卖(normal)或者按批卖(batch)，1688站点无需关注此字段 */
  saleType: 'normal' | 'batch';
  /** 售卖单位，如果为批量售卖，代表售卖的单位，该属性不为空时batchNumber为必填，例如1"手"=12“件"的"手"，国际站无需关注 */
  sellunit: string;
  /** 是否支持网上交易。true：支持 false：不支持，国际站不需关注此字段 */
  supportOnlineTrade: boolean;
  /** 税率相关信息，内容由用户自定，国际站无需关注 */
  tax: string;
  /** 计量单位 */
  unit: string;
}
/** 厂货通渠道专享价非包邮地区（地址信息列表，省份信息） */
interface ChannelPriceExcludeAreaCode {
  /** 地址编码 */
  code: string;
  /** 地址名称 */
  name: string;
}
interface DTO {
  /** 首重（单位：克）或首件（单位：件） */
  firstUnit: string;
  /** 首重或首件的价格（单位：分） */
  firstUnitFee: string;
  /** 最低一票 */
  leastExpenses: string;
  /** 续重件单位 */
  nextUnit: string;
  /** 续重件价格（单位：分） */
  nextUnitFee: string;
}
interface Rate {
  /** 是否系统模板 */
  isSysRate: boolean;
  /** 普通子模板费率 */
  rateDTO: DTO;
  /** 系统子模板费率 */
  sysRateDTO: DTO;
  /** 地址编码文本，用顿号隔开。例如：上海、福建省、广东省 */
  toAreaCodeText: string;
}

interface SubTemplateDTO {
  /** 计件类型。0:重量 1:件数 2:体积 */
  chargeType: 0 | 1 | 2;
  /** 是否系统模板 */
  isSysTemplate: boolean;
  /** 运费承担类型 卖家承担：0；买家承担：1。 */
  serviceChargeType: 0 | 1;
  /** 服务类型。0:快递 1:货运 2:货到付款 */
  serviceType: 0 | 1 | 2;
  /** 子模板类型 0基准 1增值。默认0 */
  type: 0 | 1;
}

/** 货到付款子模版 */
interface CodSubTemplate {
  /** 费率 */
  rateList: Array<Rate>;
  /** 子模板 */
  subTemplateDTO: SubTemplateDTO;
}

/** 快递子模版 */
interface ExpressSubTemplate {
  /** 费率 */
  rateList: Array<Rate>;
  /** 子模板 */
  subTemplateDTO: SubTemplateDTO;
}

/** 货运子模版 */
interface LogisticsSubTemplate {
  rateList: Array<Rate>;
  subTemplateDTO: SubTemplateDTO;
}

/** 商品运费费率 */
interface FreightTemplateItem {
  /** 地址区域编码对应的文本（包括省市区，用空格隔开） */
  addressCodeText: string;
  /** 货到付款子模版 */
  codSubTemplate: CodSubTemplate;
  /** 快递子模版 */
  expressSubTemplate: ExpressSubTemplate;
  /** 发货地址地区码 */
  fromAreaCode: string;
  /** 地址ID */
  id: string;
  /** 货运子模版 */
  logisticsSubTemplate: LogisticsSubTemplate;
  /** 模板名称 */
  name: string;
  /** 备注 */
  remark: string;
  /** 状态：1表示有效，-1表示失效 */
  status: 1 | -1;
}

/** 商品物流信息 */
interface ShippingInfo {
  /** 厂货通渠道专享价非包邮地区（地址信息列表，省份信息） */
  channelPriceExcludeAreaCodes: Array<ChannelPriceExcludeAreaCode>;
  /** 厂货通渠道专享价是否包邮，要结合非包邮地址，如果收货地址在非包邮地区则商品为不包邮 */
  channelPriceFreePostage: boolean;
  /** 运费模板ID，0表示运费说明，1表示卖家承担运费，其他值表示使用运费模版。此参数可调用运费模板相关API获取 */
  freightTemplateID: string;
  /** 商品运费费率 */
  freightTemplateList: Array<FreightTemplateItem>;
  /** 备货期，单位是天，范围是1-60。1688无需处理此字段 */
  handlingTime: number;
  /** OFFER包装高度（cm） */
  offerHeight: number;
  /** OFFER包装长度（cm） */
  offerLength: number;
  /** OFFER净重（kg） */
  offerSuttleWeight: number;
  /** OFFER包装宽度（cm） */
  offerWidth: number;
  /** 尺寸，单位是厘米，长宽高范围是1-9999999。1688无需关注此字段 */
  packageSize: string;
  /** 发货地址ID，国际站无需处理此字段 */
  sendGoodsAddressId: string;
  /** 发货地描述 */
  sendGoodsAddressText: string;
  /** 重量/毛重，单位千克/件 */
  unitWeight: number;
  /** 体积，单位是立方厘米，范围是1-9999999，1688无需关注此字段 */
  volume: number;
}

interface SkuAttribute {
  /** sku值ID，1688不用关注 */
  attValueID: string;
  /** sku属性类型；1-表示该属性是规格属性；2-表示该属性是规格扩展属性 */
  attrType: string;
  /** sku属性ID */
  attributeID: string;
  /** sku属性ID所对应的显示名，比如颜色，尺码 */
  attributeName: string;
  /** sku值内容，国际站不用关注 */
  attributeValue: string;
  /** 自定义属性值名称，1688无需关注 */
  customValueName: string;
  /** sku图片 */
  skuImageUrl: string;
}

/** sku信息 */
interface SkuInfo {
  /** 可销售数量，国际站无需关注 */
  amountOnSale: number;
  /** SKU属性值，可填多组信息 */
  attributes: Array<SkuAttribute>;
  /** 指定规格的货号，国际站无需关注 */
  cargoNumber: string;
  /** 分销基准价。代销场景均使用该价格。无SKU商品查看saleInfo中的consignPrice */
  consignPrice: number;
  /** 报价时该规格的单价，国际站注意要点：含有SKU属性的在线批发产品设定具体价格时使用此值，若设置阶梯价格则使用priceRange */
  price: number;
  /** 阶梯报价，1688无需关注 */
  priceRange: Array<PriceRange>;
  /** 零售价，团长业务使用此价格 */
  retailPrice: number;
  /** 商品编码，1688无需关注 */
  skuCode: string;
  /** skuId, 国际站无需关注 */
  skuId: string;
  /** specId, 国际站无需关注 */
  specId: string;
  /** 加工定制 sku 维度拿样价，在sku规格报价时有效，国际站无需关注 */
  takeSamplePrice: number;
}

/** 商品详情 */
interface ProductInfo {
  /** 审核时间 */
  approvedTime: string;
  attributes: Array<Attribute>;
  bizGroupInfos: Array<BizGroupInfo>;
  bizType: BizType;
  /** 成交量 */
  bookedCount: string;
  /** 商品货号，产品属性中的货号 */
  cargoNum: string;
  /** 类目ID，标识商品所属类目 */
  categoryID: string;
  /** 类目名 */
  categoryName: string;
  /** 创建时间 */
  createTime: string;
  /** 商品详情描述，可包含图片中心的图片URL */
  description: string;
  /** 详情视频 */
  detailVedio: string;
  /** 过期时间 */
  expireTime: string;
  /** 商品扩展信息 */
  extendInfos: Array<ExtendInfo>;
  /** 分组ID，确定商品所属分组。1688可传入多个分组ID，国际站同一个商品只能属于一个分组，因此默认只取第一 */
  groupID: Array<string>;
  /** 商品主图 */
  image: Image;
  /** 商品算法智能改写信息，包含算法优化后的商品标题和图片信息，未改写的则直接返回原标题和原图片 */
  intelligentInfo: IntelligentInfo;
  /** 语种，参见FAQ 语种枚举值，1688网站默认传入CHINESE */
  language: string;
  /** 最后重发时间 */
  lastRepostTime: string;
  /** 最后操作时间 */
  lastUpdateTime: string;
  /** 主图视频播放地址 */
  mainVedio: string;
  /** 修改时间 */
  modifyTime: string;
  /** 信息有效期，按天计算，国际站无此信息 */
  periodOfValidity: number;
  /** 是否图片私密信息，国际站此字段无效 */
  pictureAuth: boolean;
  /** 私密价格信息 */
  privateChannelInfo: PrivateChannelInfo;
  /** 加工定制信息 */
  processingInfo: ProcessingInfo;
  /** 现货商品关联的定制商品id */
  processingOfferId: string;
  /** 商品ID */
  productID: string;
  /** 产品线 */
  productLine: string;
  /** 商品类型，在线批发商品(wholesale)或者询盘商品(sourcing)，1688网站缺省为wholesale */
  productType: 'wholesale' | 'sourcing';
  /** 质量星级(1-7) */
  qualityLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** 参考价格，返回价格区间，可能为空 */
  referencePrice: string;
  /** 订货数据 */
  reserveInfo: ReserveInfo;
  /** 商品销售信息 */
  saleInfo: SaleInfo;
  /** 是否支持七天无理由退货 */
  sevenDaysRefunds: boolean;
  /** 商品物流信息 */
  shippingInfo: ShippingInfo;
  /** sku信息 */
  skuInfos: Array<SkuInfo>;
  /**
   * 商品状态。
   * published:上网状态;
   * member expired:会员撤销;
   * auto expired:自然过期;
   * expired:过期(包含手动过期与自动过期);
   * member deleted:会员删除;
   * modified:修改;
   * new:新发;
   * deleted:删除;
   * TBD:to be delete;
   * approved:审批通过;
   * auditing:审核中;
   * untread:审核不通过;
   */
  status:
    | 'published'
    | 'member'
    | 'auto expired'
    | 'expired'
    | 'member deleted'
    | 'modified'
    | 'new'
    | 'deleted'
    | 'TBD'
    | 'approved'
    | 'auditing'
    | 'untread';
  /** 商品标题，最多128个字符 */
  subject: string;
}

export type ProductDetailListResponse = Promise<{
  result: {
    /** 是否成功 */
    success: boolean;
    /** 错误码 */
    code: string;
    /** 错误信息 */
    message: string;
    /** 结果值 */
    result: {
      /** 批发团实例code，示例：4262537_1662426000000 */
      instanceCode: string;
      /** 商品详情 */
      productInfo: ProductInfo;
    };
  };
}>;
