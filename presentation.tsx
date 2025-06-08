"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Menu, X, ArrowUp } from "lucide-react"
import Image from "next/image"

export default function Component() {
  const [activeSection, setActiveSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const sections = [
    {
      id: "title",
      title: "논문 제목 및 발표자",
      shortTitle: "제목",
    },
    {
      id: "background",
      title: "연구 배경 및 핵심 질문",
      shortTitle: "연구 배경",
    },
    {
      id: "variables",
      title: "종속변수, 독립변수, 가설",
      shortTitle: "변수 및 가설",
    },
    {
      id: "typology",
      title: "IO 참여 유형론",
      shortTitle: "유형론",
    },
    {
      id: "methodology",
      title: "연구 설계",
      shortTitle: "연구 설계",
    },
    {
      id: "results",
      title: "연구 결과",
      shortTitle: "결과",
    },
  ]

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Show scroll to top button
      setShowScrollTop(window.scrollY > 500)

      // Update active section
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-gray-100">
      {/* 고정 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-sky-600 font-bold text-lg">권위주의 국가의 IO 활용 전략</div>
            <div className="hidden md:flex space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === index
                      ? "bg-sky-500 text-white font-semibold shadow-lg"
                      : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {section.shortTitle}
                </button>
              ))}
            </div>
            <button className="md:hidden text-gray-600 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-sky-200">
            <div className="px-4 py-2 space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                    activeSection === index
                      ? "bg-sky-500 text-white font-semibold"
                      : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {section.shortTitle}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 진행률 바 */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-gradient-to-r from-sky-500 to-sky-600 h-1 transition-all duration-300"
            style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="pt-20">
        {/* Section 1: 제목 */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 to-black text-white"
        >
          <div className="text-center space-y-12 px-4 max-w-6xl">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up">
                위협받는 권위주의 국가의
                <br />
                <span className="text-sky-300">국제기구(IO) 활용 전략</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-light text-sky-100 animate-fade-in-up delay-200">
                체제 불안정성과 정부 효율성의 상호작용
              </h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-sky-300/30 shadow-2xl animate-fade-in-up delay-400">
              <p className="text-3xl font-bold">
                발표자: <span className="text-sky-300">김홍조</span>
              </p>
            </div>
            <div className="animate-bounce mt-16">
              <ChevronDown className="w-8 h-8 mx-auto text-sky-300" />
            </div>
          </div>
        </section>

        {/* Section 2: 연구 배경 */}
        <section ref={(el) => (sectionRefs.current[1] = el)} className="min-h-screen py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
              연구 배경 및 핵심 질문
            </h2>
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-8 rounded-2xl border-l-4 border-sky-500 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-lg mr-4">
                    1
                  </span>
                  현상
                </h3>
                <p className="text-xl text-gray-700">
                  국제적 비판 속 권위주의 국가(예: 중국, 사우디 등)의 IO 적극 참여
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-l-4 border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg mr-4">
                    2
                  </span>
                  문제의식
                </h3>
                <p className="text-xl text-gray-700">
                  왜 국내적으로는 강압적으로 하면서 국제적으로는 자유주의적 질서를 따르는가? 어떤 조건에서 그러는가?
                </p>
              </div>

              <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-8 rounded-2xl border-l-4 border-sky-500 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-lg mr-4">
                    ?
                  </span>
                  핵심 질문
                </h3>
                <p className="text-xl text-gray-700 font-bold">
                  어떤 조건에서 권위주의 국가들은 국제기구에 적극적으로 참여하는가?
                </p>
              </div>

              <div className="bg-gradient-to-r from-black to-gray-800 p-8 rounded-2xl shadow-2xl text-white animate-fade-in-up">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-lg mr-4">
                    ★
                  </span>
                  본 연구 주장
                </h3>
                <p className="text-xl font-bold">
                  체제 불안정성(IO 참여 '필요성')과 정부 효율성(IO 활용 '역량')의 상호작용이 핵심
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 변수 및 가설 */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="min-h-screen py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
              종속변수, 독립변수, 가설
            </h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-xl border-l-4 border-sky-500 hover:scale-105 transition-all duration-300 animate-slide-in-left">
                  <CardHeader className="bg-sky-50">
                    <CardTitle className="text-2xl text-black">종속변수 (DV)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-lg text-gray-700">
                      <strong>국제기구 참여 수준</strong>: 주요 IO 가입 수 + UN 총회 투표 건수 → PCA 지수화
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-l-4 border-black hover:scale-105 transition-all duration-300 animate-slide-in-right">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-2xl text-black">독립변수 (IV)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>
                        <strong>체제 불안정성(PV.EST)</strong>: 정권 안정 위협 수준
                      </li>
                      <li>
                        <strong>정부 효율성(Government efficiency)</strong>: 국가 행정·제도적 능력
                      </li>
                      <li>
                        <strong>상호작용항</strong>: (체제 불안정성) × (정부 효율성)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-2xl border-2 border-sky-500 hover:shadow-3xl transition-all duration-300 animate-fade-in-up">
                <CardHeader className="bg-sky-500 text-white">
                  <CardTitle className="text-3xl text-center">가설</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-8">
                    <p className="text-2xl text-black font-bold text-center leading-relaxed">
                      H1: 권위주의 국가에서 체제 불안정성 수준이 높을수록 그리고 동시에 정부 효율성 수준이 높을수록,
                      해당 국가의 국제기구 참여 수준은 더욱 높아질 것이다.
                    </p>
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-inner">
                      <p className="text-lg text-gray-700 text-center">
                        불안정성은 IO 참여 '필요성'을 증대시키고, 효율성은 IO 활용 '역량'을 제공함. 두 요소가 결합될 때
                        IO 참여가 극대화됨.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4: 유형론 */}
        <section ref={(el) => (sectionRefs.current[3] = el)} className="min-h-screen py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
              IO 참여 유형론
            </h2>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-6xl animate-zoom-in">
                <table className="w-full border-collapse shadow-2xl rounded-2xl overflow-hidden bg-white">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-8 text-left"></th>
                      <th className="p-8 text-center font-bold text-2xl">정부 효율성: 낮음</th>
                      <th className="p-8 text-center font-bold text-2xl">정부 효율성: 높음</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-8 font-bold bg-gray-100 text-black text-xl">체제 불안정성: 낮음</td>
                      <td className="p-12 bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                          <div className="font-bold text-black text-2xl mb-4">유형1: 소극적 참여</div>
                          <div className="text-gray-600 text-lg">(필요↓, 역량↓)</div>
                        </div>
                      </td>
                      <td className="p-12 bg-sky-50 border-2 border-sky-200 hover:bg-sky-100 transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                          <div className="font-bold text-black text-2xl mb-4">유형2: 선택적 참여</div>
                          <div className="text-gray-600 text-lg">(필요↓, 역량↑)</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-8 font-bold bg-gray-100 text-black text-xl">체제 불안정성: 높음</td>
                      <td className="p-12 bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                          <div className="font-bold text-black text-2xl mb-4">유형3: 제한적 참여</div>
                          <div className="text-gray-600 text-lg">(필요↑, 역량↓)</div>
                        </div>
                      </td>
                      <td className="p-12 bg-sky-100 border-4 border-sky-500 shadow-2xl hover:bg-sky-200 transition-all duration-300 transform hover:scale-110">
                        <div className="text-center">
                          <div className="font-bold text-black text-3xl mb-4">유형4: 적극적 참여</div>
                          <div className="text-gray-700 text-lg mb-3">(필요↑, 역량↑)</div>
                          <div className="text-sky-600 font-bold text-xl">★ 본 연구 핵심 ★</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 연구 설계 */}
        <section ref={(el) => (sectionRefs.current[4] = el)} className="min-h-screen py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
              연구 설계 (Research Design)
            </h2>
            <div className="space-y-8">
              <Card className="shadow-xl border-l-4 border-black hover:shadow-2xl transition-all duration-300 animate-slide-in-left">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-2xl text-black">분석 대상 및 기간</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg text-gray-700">권위주의 79개국 국가-연도 패널 데이터 (2002-2022)</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-xl border-l-4 border-sky-500 hover:scale-105 transition-all duration-300 animate-slide-in-left">
                  <CardHeader className="bg-sky-50">
                    <CardTitle className="text-xl text-black">종속변수 (DV)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>국제기구 참여 수준</strong>: 주요 IO 가입 수 + UN 총회 투표 건수
                      </li>
                      <li>
                        <strong>측정방법</strong>: 주성분분석(PCA)을 통한 단일 지수화
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-l-4 border-black hover:scale-105 transition-all duration-300 animate-slide-in-right">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl text-black">독립변수 (IV)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>체제 불안정성(PV.EST)</strong>: WGI - 정치적 안정성 지수 역코딩
                      </li>
                      <li>
                        <strong>정부 효율성(Government efficiency)</strong>: WGI - 정부 효율성 지수
                      </li>
                      <li>
                        <strong>상호작용항</strong>: (체제 불안정성) × (정부 효율성)
                      </li>
                      <li>
                        <strong>시차</strong>: t-1 적용하여 역인과성 문제 완화
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-xl border-2 border-sky-500 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                <CardHeader className="bg-sky-500 text-white">
                  <CardTitle className="text-2xl text-center">분석 방법</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <h4 className="font-bold text-lg text-black mb-3">모형 설정</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>패널 고정효과 모형 (Panel Fixed Effects)</li>
                        <li>국가 및 연도 고정효과 포함</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                      <h4 className="font-bold text-lg text-black mb-3">통제변수</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>GDP (로그변환)</li>
                        <li>인터넷 사용률</li>
                        <li>국내 분쟁</li>
                        <li>무역 개방도</li>
                        <li>사망자수</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 6: 연구 결과 */}
        <section ref={(el) => (sectionRefs.current[5] = el)} className="min-h-screen py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
              연구 결과
            </h2>
            <div className="space-y-12">
              <Card className="border-2 border-black shadow-2xl hover:shadow-3xl transition-all duration-300 animate-slide-in-left">
                <CardHeader className="bg-black text-white">
                  <CardTitle className="text-3xl text-center">핵심 연구 결과</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-2xl text-center font-bold">
                    체제 불안정성과 정부 효율성의 교호작용항이 통계적으로 유의미한 양의 효과를 보임
                  </p>
                </CardContent>
              </Card>

              <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-sky-500 hover:shadow-3xl transition-all duration-300 animate-zoom-in">
                <h3 className="text-3xl font-bold text-black mb-8 text-center">회귀분석 결과</h3>
                <div className="relative h-[500px] md:h-[600px]">
                  <Image
                    src="/regression-results.png"
                    alt="회귀분석 결과표"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 맨 위로 버튼 */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-sky-500 hover:bg-sky-600 shadow-2xl transition-all duration-300 hover:scale-110"
          size="sm"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-zoom-in {
          animation: zoom-in 0.8s ease-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
