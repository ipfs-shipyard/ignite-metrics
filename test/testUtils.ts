import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
const expect = chai.expect

export type countlyMethodStub<T, R> = sinon.SinonStub<[configOptions?: T], R> | sinon.SinonStub<[arg0: T], R>
export interface EnsureCallOptions<T extends readonly any[], R> {
  spy: sinon.SinonStub<T, R>
  callCount: number
  callIndex?: number
  expectedArgs?: T[number]
  argsIndex?: number
}

export const ensureCall = <T extends readonly any[], R>(config: EnsureCallOptions<T, R>): void => {
  expect(config.spy).to.have.callCount(config.callCount)
  if (config.expectedArgs != null && config.callIndex != null) {
    expect(config.spy.getCall(config.callIndex).args[config.argsIndex ?? 0]).to.deep.equal(config.expectedArgs)
  }
}

export {
  expect,
  chai,
  sinonChai,
  sinon
}
