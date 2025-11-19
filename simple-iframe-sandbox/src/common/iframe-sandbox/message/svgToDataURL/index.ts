import {
  execute,
} from '@/common/iframe-sandbox/core/index';
import {
  SandboxTypeEnum,
} from '@/common/iframe-sandbox/utils/constant';

export type SvgToDataURLType = {
  svgString: string;
};

export type SvgToDataURLResponse = string;

export const handleSvgToDataURL = (params: SvgToDataURLType) => execute<
SvgToDataURLType,
SvgToDataURLResponse
>({
  type: SandboxTypeEnum.svgToDataURL,
  params,
});
