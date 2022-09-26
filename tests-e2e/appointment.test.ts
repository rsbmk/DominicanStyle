import { test, expect, chromium } from "@playwright/test"

import { LINKS_PAGES } from "../src/constants"
import { server } from "../src/mocks/server"

const LOCAL_BASE_URL = "http://localhost:5173"

test.beforeAll(() => server.listen())
test.afterEach(() => server.resetHandlers())
test.afterAll(() => server.close())

test.describe("Create appointment e2e", () => {
  test("Render app", async ({ page }) => {
    await page.goto(LOCAL_BASE_URL)
    await expect(page).toHaveTitle("Dominican Styles")
    await expect(page.locator('[aria-label="title"]')).toHaveText("Las mejores manos profecionales")
  })

  test("Navigate to appointment page", async ({ page, headless }) => {
    await page.goto(LOCAL_BASE_URL)

    const appointmentLink = page.locator('[aria-label="link to create appointment"]')
    await expect(appointmentLink).toHaveText("Agendar cita")
    await expect(appointmentLink).toHaveAttribute("href", LINKS_PAGES.createAppointment)

    await appointmentLink.click()

    await expect(page).toHaveURL(`${LOCAL_BASE_URL}${LINKS_PAGES.createAppointment}`)
    await expect(page.locator('[aria-label="title appointment"]')).toHaveText("Agenda tu cita")

    const linkToRegisterClient = page.locator('[aria-label="link to register client"]')
    await expect(linkToRegisterClient).toHaveText("¿Es primera vez que haces una cita?Registra tus datos")
    await expect(linkToRegisterClient).toHaveAttribute("href", LINKS_PAGES.registerClient)
  })
})