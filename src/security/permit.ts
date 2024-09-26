import { Permit } from 'permitio';

// This line initializes the SDK and connects your Node.js app
// to the Permit.io PDP container you've set up in the previous step.
export const permit = new Permit({
  // in production, you might need to change this url to fit your deployment
  pdp: 'https://cloudpdp.api.permit.io',
  // your api key
  token:
  'permit_key_2XezdY2BfKZj6vl87ZGXoomuXN6quDkCyouhwq3ZYgohLwQiTKqehbAxTvHJwx1SRcSatKZYK8TNf0X92oFw1f',
});