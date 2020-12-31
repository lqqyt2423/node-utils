import { dateFormat, Logger } from './index'

test('dateFormat', () => {
    console.log(dateFormat(new Date()))
    expect(true)
})

test('logger', () => {
    const logger = new Logger('hello')
    logger.info('this is log')
})
