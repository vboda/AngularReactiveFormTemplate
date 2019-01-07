import { FilterPipe } from './location.filter.pipe';

describe('LocationFilterPipe', () => {
  let data = ["vinay","vijay","prokarma","mateen","Gangadar"]
 
  it('should filter the items starting with "vi"', () => {
    const pipe = new FilterPipe();
    expect(pipe.transform(data,"vi")).toEqual(["vinay","vijay"]);
  });
});
