import httpService from './httpService';

const apiEndPoint = '/values';

export function getValues() {
  return httpService.get(apiEndPoint);
}

export default {
  getValues
};
