import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { Appointment } from '@/types'
import { Schedule } from './Schedule'
import { useAppointment } from '@/hooks/appointments'

const HOURS_OF_WORK = 24

export function TimelimeHoursList () {
  const [hourOfDayList, setHourOfDayList] = useState<string[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { getAppointments } = useAppointment()

  useEffect(() => {
    const hourOfDayList = [...Array(HOURS_OF_WORK).keys()].map((hour) => {
      return dayjs().hour(hour).format('HH')
    })
    setHourOfDayList(hourOfDayList)

    return () => setHourOfDayList([])
  }, [])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  return (
    <ul className='space-y-2'>
      {hourOfDayList.map((hour, i) => {
        const isNow = dayjs().isSame(dayjs().hour(Number(hour)), 'hour')
        const appointment = appointments.find((appointment) =>
          dayjs(appointment.schedule).isSame(dayjs().hour(Number(hour)), 'hour')
        )
        return (
          <li
            key={i}
            className={`flex items-center gap-4 ${
              isNow ? 'text-red-500 font-medium' : 'text-gray-500'
            }`}
          >
            {hour}:00
            {(appointment != null)
              ? (
                <Schedule hour={hour} />
                )
              : (
                <p className='w-full border-b-2 border-gray-400 border-opacity-50' />
                )}
          </li>
        )
      })}
    </ul>
  )
}
