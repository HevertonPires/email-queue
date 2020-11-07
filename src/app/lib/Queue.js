import Queue from 'bull'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

const add = (name, data) => {
  const queue = queues.find(queue => queue.name === name)
  return queue.bull.add(data, queue.options)
}

const process = () => {
  return queues.forEach(queue => {
    queue.bull.process(queue.handle)

    queue.bull.on('failed', (job, err) => {
      console.log('Job failed', queue.key, job.data)
      console.log(err)
    })
  })
}

export default {
  queues,
  add,
  process
}
