from fastapi import APIRouter
from shared.schemas import JudgeConfig
from services.judge_config import get_judge_config, save_judge_config

router = APIRouter(prefix="/config", tags=["config"])


@router.get("/judge", response_model=JudgeConfig)
async def get_config():
    return await get_judge_config()


@router.put("/judge", response_model=JudgeConfig)
async def update_config(config: JudgeConfig):
    await save_judge_config(config)
    return config