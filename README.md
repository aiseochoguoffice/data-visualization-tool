# 📊 데이터 시각화 도구

엑셀/CSV 파일을 업로드하고 다양한 차트로 시각화할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **파일 업로드**: CSV, Excel (.xlsx, .xls) 파일 지원
- **데이터 미리보기**: 업로드된 데이터의 테이블 형태 미리보기
- **다양한 차트 타입**:
  - 📈 선형그래프
  - 📊 막대그래프
  - 🍩 도넛차트
  - 🕸 레이더차트
  - 🌳 트리맵
  - 📅 간트차트

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **차트 라이브러리**: Chart.js + react-chartjs-2
- **파일 파싱**: xlsx (Excel), papaparse (CSV)
- **UI 프레임워크**: Bootstrap 5
- **고급 차트**: D3.js (예정)

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16+ 
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── FileUpload.tsx   # 파일 업로드 컴포넌트
│   ├── DataPreview.tsx  # 데이터 미리보기
│   ├── ChartSelector.tsx # 차트 타입 선택
│   └── ChartRenderer.tsx # 차트 렌더링
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── utils/              # 유틸리티 함수
│   └── dataParser.ts   # 파일 파싱 로직
├── App.tsx             # 메인 앱 컴포넌트
└── index.tsx           # 앱 진입점
```

## 🎯 사용법

1. **파일 업로드**: CSV 또는 Excel 파일을 드래그 앤 드롭하거나 클릭하여 선택
2. **데이터 확인**: 업로드된 데이터의 미리보기 테이블 확인
3. **차트 설정**: 
   - 차트 타입 선택
   - X축 (카테고리) 선택
   - Y축 (수치) 선택
4. **시각화**: 선택한 설정으로 차트 생성 및 확인

## 📊 샘플 데이터

각 차트 타입별로 최적화된 샘플 데이터를 제공합니다:

- **선형그래프**: `sample-data-line.csv` - 월별 매출/비용/이익 추이
- **막대그래프**: `sample-data-bar.csv` - 부서별 직원수/예산/성과
- **도넛차트**: `sample-data-doughnut.csv` - 제품 카테고리별 매출 비율
- **레이더차트**: `sample-data-radar.csv` - 팀별 다차원 평가
- **트리맵**: `sample-data-treemap.csv` - 지역별 매출/면적/인구밀도
- **간트차트**: `sample-data-gantt.csv` - 프로젝트 일정관리 및 공정관리 지표

## 🔧 개발 예정 기능

- [ ] D3.js를 활용한 고급 차트 (트리맵, 가젯차트)
- [ ] 차트 커스터마이징 옵션
- [ ] 차트 이미지 다운로드
- [ ] 데이터 필터링 및 정렬
- [ ] 다중 데이터셋 지원
- [ ] 반응형 차트 레이아웃

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 