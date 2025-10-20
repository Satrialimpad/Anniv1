'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Clock, Star, Music, Sparkles, Volume2, VolumeX, Gift, HeartHandshake, Infinity, Lock, Key } from 'lucide-react'

export default function AnniversaryPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isCountdownComplete, setIsCountdownComplete] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  // currentSection removed - no longer needed
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, left: number, delay: number, size: string}>>([])
  const [loveExplosion, setLoveExplosion] = useState<Array<{id: number, x: number, y: number, type: string}>>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFinalAnimation, setShowFinalAnimation] = useState(false)
  const [showLoveLock, setShowLoveLock] = useState(false)
  // unlockedMessages removed - no longer needed
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Countdown timer dengan localStorage untuk jam 16:30
  useEffect(() => {
    const getTargetTime = () => {
      const storageKey = 'anniversary_target_time'
      let targetTime = localStorage.getItem(storageKey)
      
      if (!targetTime) {
        const now = new Date()
        const target = new Date()
        target.setHours(16, 30, 0, 0)
        
        if (now > target) {
          target.setDate(target.getDate() + 1)
        }
        
        targetTime = target.getTime().toString()
        localStorage.setItem(storageKey, targetTime)
      }
      
      return parseInt(targetTime)
    }

    const calculateTimeLeft = () => {
      const targetTime = getTargetTime()
      const now = new Date().getTime()
      const difference = targetTime - now
      
      if (difference <= 0) {
        setIsCountdownComplete(true)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        
        // Set target untuk besok
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(16, 30, 0, 0)
        localStorage.setItem('anniversary_target_time', tomorrow.getTime().toString())
      } else {
        setIsCountdownComplete(false)
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  // Enhanced floating hearts dengan berbagai ukuran
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const sizes = ['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6', 'w-8 h-8']
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 3,
        size: sizes[Math.floor(Math.random() * sizes.length)]
      }
      setFloatingHearts(prev => [...prev, newHeart])
      
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id))
      }, 8000)
    }, 1200)

    return () => clearInterval(heartInterval)
  }, [])

  // Audio volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Timeline removed - focusing on video only

  const loveMessages = [
    "Anggun, kamu adalah cahaya dalam gelapnya hidupku",
    "Senyummu bisa menyembuhkan semua luka di hatiku",
    "Setiap detik bersamamu adalah anugerah yang tak ternilai",
    "Kamu adalah alasan aku bangun setiap pagi dengan senyum",
    "Cintaku padamu tumbuh lebih kuat setiap detik",
    "Kamu adalah impian yang menjadi nyata dalam hidupku",
    "Terima kasih telah menjadi bagian terindah dalam perjalananku"
  ]

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error)
        })
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause()
        setVideoPlaying(false)
      } else {
        videoRef.current.play().catch(error => {
          console.log('Video play failed:', error)
        })
        setVideoPlaying(true)
      }
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted
      setVideoMuted(!videoMuted)
    }
  }

  const handleVideoClick = () => {
    if (videoMuted) {
      toggleVideoMute()
    }
    toggleVideoPlay()
  }

  const handleVideoEnded = () => {
    setVideoPlaying(false)
  }

  const handleThankYou = () => {
    setShowMessage(false)
    setShowFinalAnimation(true)
    setShowLoveLock(true)
    
    // Create super love explosion
    const explosions = Array.from({ length: 100 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 90,
      y: 50 + (Math.random() - 0.5) * 90,
      type: ['heart', 'star', 'sparkle', 'flower', 'infinity', 'key'][Math.floor(Math.random() * 6)]
    }))
    
    setLoveExplosion(explosions)
    
    setTimeout(() => {
      setLoveExplosion([])
      setShowFinalAnimation(false)
      setShowLoveLock(false)
    }, 5000)
  }

  // unlockMessage function removed - no longer needed

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 overflow-hidden relative">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Sparkling stars */}
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume
          }
        }}
      >
        <source src="/perfect-ed-sheeran.mp3" type="audio/mpeg" />
        Browser Anda tidak mendukung elemen audio.
      </audio>

      {/* Enhanced Music Control */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
      <Button
        onClick={toggleMusic}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl border border-white/20 group transition-all duration-300 hover:scale-110"
      >
        <div className="relative">
          {isPlaying ? (
            <VolumeX className="w-6 h-6 group-hover:animate-pulse" />
          ) : (
            <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
          )}
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
        </div>
      </Button>
        
        <Button
          onClick={toggleMute}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full shadow-xl border border-white/20 group transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            {isMuted ? (
              <VolumeX className="w-5 h-5 group-hover:animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5 group-hover:animate-pulse" />
            )}
          </div>
        </Button>
      </div>

      {/* Magical Floating Hearts */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animation: `floatUp ${8 + heart.delay}s ease-in-out`,
            zIndex: 1
          }}
        >
          <div className="relative">
            <Heart 
              className={`${heart.size} text-pink-300 opacity-80 animate-pulse`} 
              fill="currentColor" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>
      ))}

      {/* Super Love Explosion */}
      {loveExplosion.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: 'explode 5s ease-out forwards',
            zIndex: 100
          }}
        >
          <div className="relative">
            {particle.type === 'heart' && (
              <Heart className="w-12 h-12 text-red-500 animate-pulse" fill="currentColor" />
            )}
            {particle.type === 'star' && (
              <Star className="w-12 h-12 text-yellow-300 animate-spin" fill="currentColor" />
            )}
            {particle.type === 'sparkle' && (
              <Sparkles className="w-12 h-12 text-pink-300 animate-pulse" />
            )}
            {particle.type === 'flower' && (
              <Gift className="w-12 h-12 text-purple-300 animate-pulse" />
            )}
            {particle.type === 'infinity' && (
              <Infinity className="w-12 h-12 text-blue-300 animate-pulse" />
            )}
            {particle.type === 'key' && (
              <Key className="w-12 h-12 text-yellow-400 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-ping opacity-60"></div>
          </div>
        </div>
      ))}

      {/* Magical Final Animation */}
      {showFinalAnimation && (
        <div className="fixed inset-0 bg-gradient-to-r from-pink-600/80 via-purple-600/80 to-rose-600/80 backdrop-blur-xl z-40 flex items-center justify-center">
          <div className="text-center animate-bounce">
            <div className="relative mb-8">
              <Heart className="w-32 h-32 sm:w-40 sm:h-40 mx-auto text-white animate-pulse" fill="currentColor" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping opacity-50"></div>
            </div>
            
            {showLoveLock && (
              <div className="mb-6 animate-pulse">
                <div className="flex items-center justify-center gap-4">
                  <Lock className="w-12 h-12 text-yellow-300" />
                  <HeartHandshake className="w-16 h-16 text-white animate-pulse" fill="currentColor" />
                  <Key className="w-12 h-12 text-yellow-300" />
                </div>
                <p className="text-white text-xl mt-4 font-bold">Cinta Kunci Selamanya</p>
              </div>
            )}
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
              Terima Kasih Anggun! ❤️
            </h2>
            <p className="text-2xl sm:text-3xl text-white drop-shadow-lg mb-6">
              Aku sangat mencintaimu!
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <Heart className="w-12 h-12 text-white animate-pulse" fill="currentColor" />
              <Star className="w-12 h-12 text-yellow-300 animate-spin" fill="currentColor" />
              <Infinity className="w-12 h-12 text-pink-300 animate-pulse" />
              <Heart className="w-12 h-12 text-white animate-pulse" fill="currentColor" />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section dengan Design Super Romantis */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center z-10 max-w-6xl mx-auto w-full">
          {/* Magical Crown */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-pulse opacity-30 blur-2xl"></div>
            </div>
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-yellow-300 mb-4 animate-spin" />
              <div className="flex justify-center gap-2 mb-4">
                <Star className="w-8 h-8 text-yellow-300 animate-pulse" fill="currentColor" />
                <Star className="w-8 h-8 text-yellow-300 animate-pulse" fill="currentColor" />
                <Star className="w-8 h-8 text-yellow-300 animate-pulse" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Magical Title */}
          <div className="relative mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-6 animate-pulse drop-shadow-2xl">
              Anggun
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-11xl font-black text-white/20 animate-pulse">
                Anggun
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Heart className="w-8 h-8 text-pink-300 animate-pulse" fill="currentColor" />
              <Infinity className="w-12 h-12 text-purple-300 animate-pulse" />
              <Heart className="w-8 h-8 text-pink-300 animate-pulse" fill="currentColor" />
            </div>
          </div>
          
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 mb-8 font-light tracking-wide drop-shadow-lg">
            Selamat Hari Anniversary
          </p>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 italic font-light px-4 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            "24 jam yang mengubah segalanya, seumur hidup untuk dijalani bersama dalam cinta abadi"
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <p className="text-white/90 text-sm font-medium">🎵 Perfect - Ed Sheeran</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <p className="text-white/90 text-sm font-medium">💕 Cinta Abadi</p>
            </div>
          </div>

          {/* Magical Countdown Timer */}
          <div className="mb-12">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mx-auto max-w-md sm:max-w-lg overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 sm:p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isCountdownComplete ? "Waktu sudah tiba!" : "Menuju Jam 16:30"}
                  </h3>
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" fill="currentColor" />
                </div>
              </div>
              {!isCountdownComplete && (
                <CardContent className="p-6 sm:p-8 bg-black/20">
                  <div className="flex justify-center gap-4 sm:gap-6">
                    <div className="text-center group">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-sm sm:text-base text-white/80 font-medium">Jam</div>
                    </div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl text-pink-300 font-bold self-center animate-pulse">:</div>
                    <div className="text-center group">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-sm sm:text-base text-white/80 font-medium">Menit</div>
                    </div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl text-pink-300 font-bold self-center animate-pulse">:</div>
                    <div className="text-center group">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-sm sm:text-base text-white/80 font-medium">Detik</div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Magical CTA Button */}
          <Button 
            onClick={() => setShowMessage(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 sm:px-16 py-6 sm:py-8 text-xl sm:text-2xl font-black rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl group relative overflow-hidden border-2 border-white/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 mr-4 group-hover:animate-pulse" />
            Buka Pesan Cinta
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 ml-4 group-hover:animate-spin" />
          </Button>
        </div>
      </section>

      {/* Enhanced Love Message Modal dengan Bug Fixed */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <Card className="bg-white/10 backdrop-blur-md max-w-lg sm:max-w-xl w-full border border-white/20 shadow-2xl transform scale-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 sm:p-6">
              <div className="text-center">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white mb-2 animate-pulse" fill="currentColor" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                  Pesan Cinta Untuk Anggun
                </h2>
              </div>
            </div>
            <CardContent className="p-4 sm:p-6 bg-black/20">
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {loveMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className="text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <p className="text-sm sm:text-base text-white/90 italic font-light leading-relaxed">
                      {message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-base sm:text-lg text-white font-bold leading-relaxed">
                  Aku mencintaimu lebih dari kata-kata bisa ungkapkan, Anggun. ❤️
                </p>
              </div>
              <div className="text-center">
                <Button 
                  onClick={handleThankYou}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-black shadow-xl relative overflow-hidden border-2 border-white/30"
                >
                  Terima Kasih
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Timeline section removed - focusing on video only */}

      {/* Video Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-6 drop-shadow-2xl">
              Video Kenangan Spesial
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" fill="currentColor" />
              <Heart className="w-8 h-8 text-pink-300 animate-pulse" fill="currentColor" />
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" fill="currentColor" />
            </div>
            <div className="w-32 h-2 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-lg sm:text-xl text-white/80 mt-6 max-w-3xl mx-auto">
              Sebuah video yang dibuat dengan penuh cinta untuk mengabadikan momen-momen indah kita bersama
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <p className="text-white/90 text-sm font-medium">🎬 Video HD</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <p className="text-white/90 text-sm font-medium">🎵 Dengan Audio</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <p className="text-white/90 text-sm font-medium">💕 Penuh Cinta</p>
              </div>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="mb-12">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 sm:p-6">
                <div className="flex items-center justify-center gap-3">
                  <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Video Kenangan Spesial</h3>
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" fill="currentColor" />
                </div>
              </div>
              <div className="aspect-[16/9] bg-black/30 relative group cursor-pointer" onClick={handleVideoClick}>
                {/* Video Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Video Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/50 transition-colors duration-300 rounded-lg"></div>
                
                {/* Video Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted={videoMuted}
                  loop
                  playsInline
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={handleVideoEnded}
                >
                  <source src="/romantic-video.mp4" type="video/mp4" />
                  Browser Anda tidak mendukung tag video.
                </video>
                
                {/* Video Controls Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoPlay()
                    }}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-110"
                    title={videoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {videoPlaying ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-3 bg-white"></div>
                        <div className="w-1 h-3 bg-white"></div>
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-0.5"></div>
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoMute()
                    }}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-110"
                    title={videoMuted ? "Unmute Video" : "Mute Video"}
                  >
                    {videoMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                {/* Video Status Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${videoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                    {videoPlaying ? 'Playing' : 'Paused'}
                  </span>
                </div>
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="text-center text-white">
                      <div className="flex justify-center gap-4 mb-4">
                        <Heart className="w-8 h-8 animate-pulse" fill="currentColor" />
                        <Star className="w-8 h-8 animate-spin" fill="currentColor" />
                        <Heart className="w-8 h-8 animate-pulse" fill="currentColor" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">Video Anniversary Untuk Anggun</h4>
                      <p className="text-sm sm:text-base opacity-90">
                        {videoMuted ? "🎵 Klik untuk memutar dengan suara" : "🎬 Setiap frame adalah kenangan indah kita"}
                      </p>
                      {videoMuted && (
                        <div className="mt-2 flex items-center justify-center gap-2 text-xs opacity-80">
                          <VolumeX className="w-4 h-4" />
                          <span>Video dimulai tanpa suara - klik untuk mengaktifkan audio</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                {!videoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 sm:p-6 border-2 border-white/30 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <div className="flex items-center gap-2">
                        <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                        {videoMuted && (
                          <div className="flex items-center gap-1">
                            <VolumeX className="w-6 h-6 text-white/70" />
                            <span className="text-white/70 text-xs">Audio</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Click to Play Instruction */}
                {!videoPlaying && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <p className="text-white text-xs font-medium flex items-center gap-2">
                        <span className="animate-bounce">👆</span>
                        Klik untuk memutar video
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Video Controls Help */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                    <p className="text-white text-xs font-medium">Kontrol di pojok kanan</p>
                  </div>
                </div>
                
                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink-300 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-300 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-300 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-300 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Video Progress Bar */}
                {videoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                    <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"></div>
                  </div>
                )}
                
                {/* Video Loading Indicator */}
                {!videoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-xs opacity-80">Loading video...</p>
                    </div>
                  </div>
                )}
                
                {/* Video Quality Indicator */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                    <p className="text-white text-xs font-medium">HD Quality</p>
                  </div>
                </div>
                
                {/* Video Duration Indicator */}
                {videoPlaying && (
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <p className="text-white text-xs font-medium">Loop</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* Image Gallery removed - focusing on video only */}
        </div>
      </section>

      {/* Enhanced Final Message */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-rose-600/20 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 sm:p-12">
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-yellow-300 animate-pulse" fill="currentColor" />
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white animate-pulse" fill="currentColor" />
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-yellow-300 animate-pulse" fill="currentColor" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                  Untuk Anggun Tercinta
                </h2>
              </div>
            </div>
            <CardContent className="p-8 sm:p-12 lg:p-16 bg-black/20">
              <div className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                  Terima kasih telah menjadi bagian terindah dalam hidupku. 
                  Setiap detik bersamamu adalah anugerah yang tak ternilai. 
                  Anniversary ini adalah awal dari perjalanan panjang kita bersama dalam cinta abadi.
                </p>
                <div className="flex justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="relative">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-red-400 animate-pulse" fill="currentColor" />
                    <div className="absolute inset-0 bg-red-300 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <Infinity className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-300 animate-pulse" />
                  <Music className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-pink-300 animate-pulse" />
                  <div className="relative">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-red-400 animate-pulse" fill="currentColor" />
                    <div className="absolute inset-0 bg-red-300 rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 drop-shadow-2xl">
                  I Love You, Anggun ❤️
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Heart className="w-6 h-6 text-pink-300 animate-pulse" fill="currentColor" />
                  <Heart className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" />
                  <Heart className="w-6 h-6 text-pink-300 animate-pulse" fill="currentColor" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: translateY(80vh) rotate(45deg) scale(1);
          }
          90% {
            opacity: 0.8;
            transform: translateY(20vh) rotate(315deg) scale(1);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translate(-50%, -50%) scale(1.5) rotate(90deg);
            opacity: 0.9;
          }
          50% {
            transform: translate(-50%, -50%) scale(2) rotate(180deg);
            opacity: 0.7;
          }
          75% {
            transform: translate(-50%, -50%) scale(2.5) rotate(270deg);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(3) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}