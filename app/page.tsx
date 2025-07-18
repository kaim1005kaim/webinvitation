import HeroSection from '@/components/HeroSection'
import DetailsSection from '@/components/DetailsSection'
import Timeline from '@/components/Timeline'
import Gallery from '@/components/Gallery'
import RsvpForm from '@/components/RsvpForm'
import Footer from '@/components/Footer'

export default function Home() {
  // Sample data - in a real app, this would come from a CMS or database
  const heroData = {
    names: 'Kai & Mizuki',
    date: 'Sunday, 23 Nov 2025',
    bgImage: '/images/hero-bg.png'
  }

  const venueData = {
    name: 'HOTEL EMANON',
    jpAddress: '〒150-0036　東京都渋谷区南平台町7-1',
    enAddress: '7-1, Nampeidaicho, Shibuya-ku, Tokyo, 150-0036, Japan',
    mapUrl: 'https://www.google.com/maps?q=HOTEL+EMANON+7-1+Nampeidaicho+Shibuya+Tokyo',
    dressCode: 'あなたの思うお洒落を'
  }

  const eventsData = [
    {
      title: '1部（披露宴）',
      start: '2025-11-23T13:00:00+09:00',
      reception: '12:30〜',
      fee: '25,000円'
    },
    {
      title: '2部（アフターパーティ）',
      start: '2025-11-23T17:00:00+09:00',
      reception: '16:30〜',
      fee: '7,000円',
      note: '※会場は1部と同じ場所で開催いたします。'
    }
  ]

  const scheduleData = [
    { time: '12:30', label: '受付開始 (1部)' },
    { time: '13:00', label: '1部 開始' },
    { time: '15:30', label: '1部 終了' },
    { time: '16:30', label: '受付開始 (2部)' },
    { time: '17:00', label: '2部 開始' },
    { time: '19:00', label: '2部 終了' }
  ]

  const galleryData = {
    story: `私たちは会社の同僚として出会い、長い時間をかけて
お互いを理解し合い、支え合ってきました。

今日という特別な日に、大切な皆様に見守られながら
新しい人生の一歩を踏み出すことができることを
心より感謝しております。

これからも二人で力を合わせて、
笑顔あふれる温かい家庭を築いていきます。`,
    photos: [
      {
        src: '/images/photo1.png',
        alt: 'photo1',
        caption: 'photo1'
      },
      {
        src: '/images/photo2.png',
        alt: 'photo2',
        caption: 'photo2'
      },
      {
        src: '/images/photo3.png',
        alt: 'photo3',
        caption: 'photo3'
      },
      {
        src: '/images/photo4.png',
        alt: 'photo4',
        caption: 'photo4'
      }
    ]
  }

  return (
    <main className="min-h-screen">
      <HeroSection
        names={heroData.names}
        date={heroData.date}
        bgImage={heroData.bgImage}
      />
      
      <Gallery photos={galleryData.photos} story={galleryData.story} />
      
      <DetailsSection events={eventsData} venue={venueData} />
      
      <Timeline schedule={scheduleData} />
      
      <RsvpForm />
      
      <Footer copyright="© 2025 Kai & Mizuki. All rights reserved." />
    </main>
  )
}