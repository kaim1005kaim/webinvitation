import HeroSection from '@/components/HeroSection'
import DetailsSection from '@/components/DetailsSection'
import Timeline from '@/components/Timeline'
import Gallery from '@/components/Gallery'
import RsvpForm from '@/components/RsvpForm'
import Footer from '@/components/Footer'

export default function Home() {
  // Sample data - in a real app, this would come from a CMS or database
  const heroData = {
    names: {
      groom: '太郎',
      bride: '花子'
    },
    date: '2024年9月15日',
    tagline: '二人の新しい旅路が始まります',
    bgImage: '/images/hero-bg.png'
  }

  const eventsData = [
    {
      type: '挙式',
      date: '2024年9月15日（日）',
      time: '11:00 - 12:00',
      venue: '教会名',
      address: '東京都渋谷区恵比寿1-1-1',
      mapUrl: 'https://maps.google.com',
      dressCode: 'フォーマル'
    },
    {
      type: '披露宴',
      date: '2024年9月15日（日）',
      time: '13:00 - 15:30',
      venue: 'ホテル名',
      address: '東京都渋谷区恵比寿2-2-2',
      mapUrl: 'https://maps.google.com',
      dressCode: 'セミフォーマル'
    }
  ]

  const timelineData = [
    {
      time: '11:00',
      title: '挙式',
      description: '神聖な誓いの儀式',
      icon: '⛪'
    },
    {
      time: '11:30',
      title: 'アフターセレモニー',
      description: '記念撮影とお祝い',
      icon: '📸'
    },
    {
      time: '13:00',
      title: '披露宴開始',
      description: '新郎新婦入場',
      icon: '🎉'
    },
    {
      time: '13:30',
      title: 'お食事',
      description: '美味しいお料理をお楽しみください',
      icon: '🍽️'
    },
    {
      time: '14:30',
      title: '余興・スピーチ',
      description: 'みなさまからの温かいメッセージ',
      icon: '🎤'
    },
    {
      time: '15:30',
      title: '送賓',
      description: 'お見送り',
      icon: '👋'
    }
  ]

  const galleryData = {
    story: `私たちは大学時代に出会い、長い時間をかけて
お互いを理解し合い、支え合ってきました。

今日という特別な日に、大切な皆様に見守られながら
新しい人生の一歩を踏み出すことができることを
心より感謝しております。

これからも二人で力を合わせて、
笑顔あふれる温かい家庭を築いていきます。`,
    photos: [
      {
        src: '/images/photo1.png',
        alt: '出会いの頃',
        caption: '大学時代の二人'
      },
      {
        src: '/images/photo2.png',
        alt: 'プロポーズ',
        caption: '忘れられない瞬間'
      },
      {
        src: '/images/photo3.png',
        alt: 'エンゲージメント',
        caption: '婚約記念'
      },
      {
        src: '/images/photo4.png',
        alt: '前撮り',
        caption: '前撮り撮影'
      }
    ]
  }

  return (
    <main className="min-h-screen">
      <HeroSection
        names={heroData.names}
        date={heroData.date}
        tagline={heroData.tagline}
        bgImage={heroData.bgImage}
      />
      
      <DetailsSection events={eventsData} />
      
      <Timeline schedule={timelineData} />
      
      <Gallery photos={galleryData.photos} story={galleryData.story} />
      
      <RsvpForm />
      
      <Footer copyright="© 2024 太郎 & 花子. All rights reserved." />
    </main>
  )
}