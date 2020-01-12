import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai);

import validate from '../../src/components/validator'

describe('validate', () => {
  it('存在', () => {
    expect(validate).to.exist
  });

  it('test 1', () => {
    let data = {
      email: ''
    }

    let rules = [
      {
        key: 'email', required: true,
      }
    ]

    let errors = validate(data, rules);
    expect(errors.email.required).to.eq('必填')
  })
})
