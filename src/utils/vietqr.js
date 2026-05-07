import QRCode from 'qrcode'

const tlv = (id, value) => {
  const stringValue = String(value ?? '')
  return `${id}${String(stringValue.length).padStart(2, '0')}${stringValue}`
}

const crc16Ccitt = (input) => {
  let crc = 0xffff

  for (let index = 0; index < input.length; index += 1) {
    crc ^= input.charCodeAt(index) << 8

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export const sanitizeTransferContent = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/d/g, 'd')
  .replace(/Ð/g, 'D')
  .replace(/[^a-zA-Z0-9@.\- ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .toUpperCase()

export const buildTransferContent = ({ name, phone, email }) => (
  `${name.trim()} - ${phone.trim()} - ${email.trim()}`
)

export const buildVietQrPayload = ({ bankBin, accountNumber, amount, transferContent }) => {
  const merchantAccountInfo = tlv(
    '38',
    [
      tlv('00', 'A000000727'),
      tlv(
        '01',
        [
          tlv('00', bankBin),
          tlv('01', accountNumber)
        ].join('')
      ),
      tlv('02', 'QRIBFTTA')
    ].join('')
  )

  const additionalData = tlv('62', tlv('08', sanitizeTransferContent(transferContent)))

  const payloadWithoutCrc = [
    '000201',
    '010212',
    merchantAccountInfo,
    '5303704',
    tlv('54', String(amount)),
    '5802VN',
    additionalData,
    '6304'
  ].join('')

  return `${payloadWithoutCrc}${crc16Ccitt(payloadWithoutCrc)}`
}

export const generateVietQrDataUrl = async (options) => {
  const payload = buildVietQrPayload(options)

  const dataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 512,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })

  return {
    payload,
    dataUrl
  }
}
