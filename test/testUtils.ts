import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

chai.use(sinonChai)
const expect = chai.expect

export type countlyMethodStub<T, R> = sinon.SinonStub<[configOptions?: T], R> | sinon.SinonStub<[arg0: T], R>

export {
  expect,
  chai,
  sinonChai,
  sinon
}
